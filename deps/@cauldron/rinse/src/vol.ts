import { Bukkit } from 'bukkit';
import { Runnable } from 'java/lang';
import Queue from 'internal/queue';
import Component, { StateUpdateHandler } from './component';
import Rinsable, { RenderResult } from './rinsable';
import { FiberEventType, FiberEvent } from './fiber';

const MOST_UPDATES_PER_TICK = 64;

//@ts-ignore
const runnable = run => Java.extend(Runnable, { run });

let currentVolInstance: VolInstance = null;
const volInstances = new Map<string, VolInstance>();

export function getCurrentVolInstance() {
  return currentVolInstance;
}

export function getVolByNamespace(namespace: string): VolInstance {
  return volInstances.get(namespace);
}

type StateUpdateEvent = {
  component: Component;
  newValues: object;
  handler: (newState: object) => void;
};

/**
 * The VOL (Virtual Object Lifecycle) is in charge of watching instances
 * of components registered within Rinse. This is done by iterating through
 * each namespace that is mounted
 */
class VolInstance {
  taskId: number;
  namespace: string;
  registeredComponents: Map<Rinsable, object>; // function/props map
  branches: Map<Rinsable, boolean>;
  fiberUpdates: Queue;
  isReadingQueue: boolean;
  hookedStates: Map<Rinsable, object>;

  constructor(namespace: string) {
    volInstances.set(namespace, this);
    this.namespace = namespace;
    this.registeredComponents = new Map<Rinsable, object>();
    this.branches = new Map<Rinsable, boolean>();
    this.fiberUpdates = new Queue();
    this.taskId = -1;
    this.isReadingQueue = false;
    this.hookedStates = new Map<Rinsable, object>();
  }

  startWatch() {
    if (this.taskId !== -1) {
      // cancel the task
    }
    this.taskId = Bukkit.getScheduler().scheduleSyncDelayedTask(
      $$cauldron$$,
      runnable(() => {
        if (this.isReadingQueue) return;
        for (let i = 0; i < MOST_UPDATES_PER_TICK; ++i) {
          // 64 should be fine, right?
          if (this.fiberUpdates.size() === 0) return;
          const fiberEvent = this.fiberUpdates.pop() as FiberEvent;
          switch (fiberEvent.type) {
            case FiberEventType.UPDATE_STATE:
              this.updateStateFor(fiberEvent.args as StateUpdateEvent);
              break;
          }
        }
      }),
      1
    );
  }

  private updateStateFor(stateUpdate: StateUpdateEvent) {
    const { component } = stateUpdate;
    if (!component) return; // the component was unmounted
    const oldState = { ...component.state };
    const newState = { ...oldState, ...stateUpdate.newValues };
    stateUpdate.handler(newState);
    component.componentDidUpdate(component.props, oldState);
    // mark this branch of the tree as invalid
    this.branches.set(component, false);
  }

  private updatePropsFor(component: Rinsable, newProps: object) {}

  private mountComponent(component: Rinsable, props: object) {}

  private unmountComponent(component: Rinsable) {}

  queueStateUpdate(component: Component, newValues: object): Promise<object> {
    return new Promise(resolve => {
      const stateUpdate = {
        componentId: component.__id,
        newValues,
        handler: resolve
      };
      this.fiberUpdates.push({
        type: FiberEventType.UPDATE_STATE,
        component,
        args: stateUpdate
      });
    });
  }

  registerComponent(component: Rinsable, children: RenderResult): VolInstance {
    return this;
  }

  getStateFor(component: Rinsable) {}
}

export function beginWatchingTree(namespace: string): VolInstance {
  const instance = new VolInstance(namespace);
  currentVolInstance = instance;
  instance.startWatch();
  return instance;
}

export function registerComponent(component: Rinsable) {}

export function registerFunction() {}

const stateUpdateQueue = new Map<string, StateUpdateHandler>();
export function queueStateUpdate(
  component: Component,
  newValues: object
): Promise<object> {
  return new Promise((resolve, reject) => {
    Bukkit.getScheduler().scheduleSyncDelayedTask(
      $$cauldron$$,
      runnable(() => {}),
      1
    );
  });
}

export function processComponent(component: Rinsable) {}

export function shouldUpdate(id, props) {}

export function unmountComponent(component: Rinsable) {}
