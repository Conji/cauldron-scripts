import Rinse, { Command } from '@cauldron/rinse';
import colors from '@cauldron/colors';
import { getName, getUuid } from '@cauldron/players';
import {
  canClaim,
  claim,
  unclaim,
  unclaimAll,
  doesOwn,
  getProfileFor,
  commitProfiles,
  CLAIM_OPTIONS
} from './profile';
import { createClaim, isClaimable, removeClaims, getClaimFor } from './claim';
import {
  getChunkCoordsForEntity,
  getPlayerList,
  getPlayerByName,
  getMembersList,
  getWorldNames
} from './utils';

function executeClaim({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  const profile = getProfileFor(uuid);
  if (profile.claimsAllowed <= profile.claims.length) {
    return colors.red("[LandMine] You don't have any claims left");
  }
  if (!canClaim(uuid, coords)) {
    return colors.red(
      "[LandMine] This claim isn't connected to any previous claims"
    );
  }
  if (!isClaimable(coords)) {
    return colors.red('[LandMine] This chunk has already been claimed');
  }
  createClaim(coords, uuid);
  claim(uuid, coords);

  return colors.green(`[LandMine] Claimed ${coords.x},${coords.z}`);
}

function executeUnclaim({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  try {
    if (getClaimFor(coords).owner !== uuid) {
      return colors.red("[LandMine] You don't own this chunk!");
    }
    unclaim(uuid, coords);
    removeClaims(coords);
    return colors.green(`[LandMine] Unclaimed ${coords.x},${coords.z}`);
  } catch (err) {
    return colors.red(`[LandMine] Failed to unclaim: ${err}`);
  }
}

function executeUnclaimAll({ sender }) {
  const uuid = sender.getUniqueId().toString();
  try {
    const unclaimed = unclaimAll(uuid);
    removeClaims(unclaimed);
    return colors.green(`[LandMine] Unclaimed ${unclaimed.length} chunks`);
  } catch (err) {
    return colors.red(`[LandMine] Failed to unclaim all: ${err}`);
  }
}

function executeMap({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  const mapWidth = 10;
  const mapHeight = 3;
  const result = [
    `${colors.green('Owned')} ${colors.yellow('Resident')} ${colors.red(
      'Claimed'
    )} ${colors.white('Available')}`,
    colors.yellow(`=====${coords.world}: ${coords.x},${coords.z}=====`)
  ];
  for (let x = -mapHeight; x <= mapHeight; ++x) {
    let line = '';
    for (let z = -mapWidth; z <= mapWidth; ++z) {
      const char = x === 0 && z === 0 ? '-' : '+';
      const claim = getClaimFor({
        x: coords.x + x,
        z: coords.z + z,
        world: coords.world
      });
      if (claim) {
        if (claim.owner === uuid) line += colors.green(char);
        else if (claim.residents.indexOf(uuid) > -1)
          line += colors.yellow(char);
        else line += colors.red(char);
      } else {
        line += colors.white(char);
      }
    }
    result.push(line);
  }
  sender.sendMessage(result);
}

function executeInfo({ sender }) {
  const coords = getChunkCoordsForEntity(sender);
  const claim = getClaimFor(coords);
  if (claim) {
    return colors.yellow('[LandMine] This chunk has already been claimed');
  } else {
    return colors.green('[LandMine] This chunk has not been claimed');
  }
}

function executeModify({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  if (!profile) return colors.red('You have no claims to modify');
  for (const rule of args) {
    const name = rule.split('=')[0];
    if (Object.values(CLAIM_OPTIONS).indexOf(name) === -1) {
      sender.sendMessage(colors.red(`Unknown rule ${name}`));
      continue;
    }
    const value = (rule.split('=')[1] || 'allow').toLowerCase();
    if (value === 'allow' || value === true) {
      profile.rules[name] = true;
    } else if (value === 'deny' || value === false) {
      profile.rules[name] = false;
    } else {
      return colors.red(
        `[LandMine] Unknown value "${value}". Must be allow/deny/true/false`
      );
    }
  }

  commitProfiles();

  return colors.green('[LandMine] Successfully updated rules for all claims');
}

function executeMembersInfo({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
}

function executeMembersAdd({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  const coords = getChunkCoordsForEntity(sender);
}

function executeMembersRemove({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  const coords = getChunkCoordsForEntity(sender);
}

function executeGiveBonus({ args }) {
  const [playername, amount] = args;
  if (!playername) {
    return colors.red('[LandMine] You must provide a player name');
  } else if (!amount) {
    return colors.red('[LandMine] You must provide an amount');
  } else if (isNaN(amount)) {
    return colors.red('[LandMine] Invalid number');
  }
  const uuid = getUuid(playername);
  if (!uuid) {
    return colors.red(
      `[LandMine] No player found with the name ${playername}. Ensure this is not a nickname`
    );
  }
  const profile = getProfileFor(uuid);
  profile.bonusClaims += parseInt(amount);
  return colors.green(
    `[LandMine] Granted ${playername} ${amount} bonus claims`
  );
}

export const LandmineCommands = () => (
  <Command name="landmine" aliases={['lm']}>
    <Command name="claim" aliases={['c']} execute={executeClaim} isForPlayer />
    <Command
      name="unclaim"
      aliases={['delete', 'remove', 'r', 'u']}
      execute={executeUnclaim}
    >
      <Command
        name="all"
        execute={executeUnclaimAll}
        tabComplete={getWorldNames}
      />
    </Command>
    <Command name="map" aliases={['m']} execute={executeMap} />
    <Command name="info" aliases={['i']} execute={executeInfo} />
    <Command name="modify" execute={executeModify} />
    <Command name="members" execute={executeMembersInfo}>
      <Command
        name="add"
        execute={executeMembersAdd}
        tabComplete={getPlayerList}
      />
      <Command
        name="remove"
        execute={executeMembersRemove}
        tabComplete={getMembersList}
      />
    </Command>
    <Command
      name="givebonus"
      permission="landmine.givebonus"
      execute={executeGiveBonus}
      tabComplete={getPlayerList}
    />
  </Command>
);