declare module 'bukkit' {
  export class Bukkit {
    static addRecipe(recipe: Recipe): boolean;
    static banIP(address: string): void;
    static broadcast(message: string, permission: string): number;
    static broadcastMessage(message: string): number;
    static clearRecipes(): void;
    static createBlockData(data: string): BlockData;
    static createBlockData(material: Material, data: string): BlockData;
    static createBossBar(
      title: string,
      color: BarColor,
      style: BarStyle,
      ...flags: BarFlag
    ): BossBar;
  }

  export class Color {}

  export class FireworkEffect {}

  export class GameRule {}

  export class Location {}

  export class NamespacedKey {}

  export class Note {}

  export class StructureType {}

  export interface BanEntry {}

  export interface BanList {}

  export namespace BanList {
    export enum Type {}
  }

  export interface BlockChangeDelegate {}

  export interface Chunk {}

  export interface ChunkSnapshot {}

  export interface Keyed {}

  export interface Nameable {}

  export interface OfflinePlayer {}

  export interface Raid {}

  export interface Register {}

  export interface Server {}

  export interface Tag {}

  export interface UnsafeValues {}

  export interface World {}

  export interface WorldBorder {}

  export enum Achievement {}

  export enum Art {}

  export enum Axis {}

  export enum ChatColor {}

  export enum CoalType {}

  export enum CropState {}

  export enum Difficulty {}

  export enum DyeColor {}

  export enum Effect {}

  export module Effect {
    export enum Type {}
  }

  export enum EntityEffect {}

  export module FireworkEffect {
    export enum Type {}
  }

  export enum FluidCollisionMode {}

  export enum GameMode {}

  export enum GrassSpecies {}

  export enum Instrument {}

  export enum Material {}

  export enum NetherWartsState {}

  export module Note {
    export enum Tone {}
  }

  export enum Particle {}

  export enum PortalType {}

  export module Raid {
    export enum RaidStatus {}
  }

  export enum Rotation {}

  export enum SandstoneType {}

  export enum SkullType {}

  export enum Sound {}

  export enum SoundCategory {}

  export enum Statistic {}

  export module Statistic {
    export enum Type {}
  }

  export enum TreeSpecies {}

  export enum TreeType {}

  export module Warning {
    export enum WarningState {}
  }

  export enum WeatherType {}

  export module World {
    export enum Environment {}
  }

  export enum WorldType {}
}

declare module 'bukkit/advancement' {}

declare module 'bukkit/attribute' {}

declare module 'bukkit/block' {
  import { Enum } from 'java/lang';

  export interface Banner {}

  export interface Barrel {}

  export interface Beacon {}

  export interface Bed {}

  export interface Bell {}

  export interface BlastFurnace {}

  export interface Block {}

  export interface BlockState {}

  export interface BrewingStand {}

  export interface Campfire {}

  export interface Chest {}

  export interface CommandBlock {}

  export interface Comparator {}

  export interface Conduit {}

  export interface Container {}

  export interface CreatureSpawner {}

  export interface DaylightDetector {}

  export interface Dispenser {}

  export interface Dropper {}

  export interface EnchantingTable {}

  export interface EnderChest {}

  export interface EndGateway {}

  export interface FlowerPot {}

  export interface Furnace {}

  export interface Hopper {}

  export interface Jigsaw {}

  export interface Jukebox {}

  export interface Lectern {}

  export interface Lockable {}

  export interface NoteBlock {}

  export interface ShulkerBox {}

  export interface Sign {}

  export interface Skull {}

  export interface Smoker {}

  export interface Structure {}

  export interface TileState {}

  export class DoubleChest {}

  export class Biome extends Enum<Biome> {}

  export class BlockFace extends Enum<BlockFace> {}

  export class PistonMoveReaction extends Enum<PistonMoveReaction> {}
}

declare module 'bukkit/block/banner' {
  import { Enum } from 'java/lang';
  export class Pattern {}

  export class PatternType extends Enum<PatternType> {}
}

declare module 'bukkit/block/data' {
  import { Material } from 'bukkit';

  export interface BlockData {
    clone(): BlockData;
    getAsString(hideUnspecified?: boolean): string;
    getMaterial(): Material;
    matches(data: BlockData): boolean;
    merge(data: BlockData): BlockData;
  }

  export interface Ageable {}

  export interface AnaloguePowerable {}

  export interface Attachable {}

  export interface Bisected {}

  export interface Directional {}

  export interface Levelled {}

  export interface Lightable {}

  export interface MultipleFacing {}

  export interface Openable {}

  export interface Orientable {}

  export interface Powerable {}

  export interface Rail {}

  export interface Rotatable {}

  export interface Snowable {}

  export interface Waterlogged {}

  export module Bisected {
    export class Half extends Enum<Half> {}
  }

  export module Rail {
    export class Shape extends Enum<Shape> {}
  }
}

declare module 'bukkit/block/data/type' {}

declare module 'bukkit/block/structure' {}

declare module 'bukkit/boss' {}

declare module 'bukkit/command' {}

declare module 'bukkit/command/defaults' {}

declare module 'bukkit/configuration' {}

declare module 'bukkit/configuration/file' {}

declare module 'bukkit/configuration/serialization' {}

declare module 'bukkit/conversation' {}

declare module 'bukkit/enchantments' {}

declare module 'bukkit/entity' {}

declare module 'bukkit/entity/memory' {}

declare module 'bukkit/entity/minecart' {}

declare module 'bukkit/event' {}

declare module 'bukkit/event/block' {}

declare module 'bukkit/event/enchantment' {}

declare module 'bukkit/event/entity' {}

declare module 'bukkit/event/hanging' {}

declare module 'bukkit/event/inventory' {}

declare module 'bukkit/event/player' {}

declare module 'bukkit/event/raid' {}

declare module 'bukkit/event/server' {}

declare module 'bukkit/event/vehicle' {}

declare module 'bukkit/event/weather' {}

declare module 'bukkit/event/world' {}

declare module 'bukkit/generator' {}

declare module 'bukkit/help' {}

declare module 'bukkit/inventory' {}

declare module 'bukkit/inventory/meta' {}

declare module 'bukkit/inventory/meta/tags' {}

declare module 'bukkit/loot' {}

declare module 'bukkit/map' {}

declare module 'bukkit/material' {}

declare module 'bukkit/material/types' {}

declare module 'bukkit/metadata' {}

declare module 'bukkit/permissions' {}

declare module 'bukkit/persistence' {}

declare module 'bukkit/plugin' {}

declare module 'bukkit/plugin/java' {}

declare module 'bukkit/plugin/messaging' {}

declare module 'bukkit/potion' {}

declare module 'bukkit/projectiles' {}

declare module 'bukkit/scheduler' {}

declare module 'bukkit/scoreboard' {}

declare module 'bukkit/util' {}

declare module 'bukkit/util/io' {}

declare module 'bukkit/util/permissions' {}

declare module 'spigotmc' {}

declare module 'spigotmc/event/entity' {}

declare module 'spigotmc/event/player' {}

declare module 'java/lang' {
  export class Object {
    constructor();
    getClass(): Class;
    equals(obj: object): boolean;
    hashCode(): number;
    notify(): void;
    notifyAll(): void;
    toString(): string;
    wait(): void;
    wait(timeout: number, nanos?: number): void;
  }

  export class Class<T> extends Object {
    asSubclass<U>(clazz: Class<U>): Class<U>;
    cast(obj: object): T;
    desiredAssertionStatus(): boolean;
    static forName(module, name: string): Class<T>;
    static forName(name: string): Class<T>;
  }

  export class Enum<E extends Enum> extends Object implements Comparable<E> {
    protected constructor(name: string, ordinal: number);

    protected clone(): Object;
    protected finalize(): void;
    compareTo(o: E): number;
    equals(o: object): boolean;
    getDeclaringClass(): Class<E>;
    hashCode(): number;
    name(): string;
    ordinal(): number;
    toString(): string;
    static valueOf<T extends Enum<T>>(enumType: Class<T>, name: string): T;
  }

  export interface Comparable<T> {
    compareTo(o: T): number;
  }

  export interface Cloneable {
    clone(): object;
  }
}
