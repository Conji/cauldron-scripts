export const getPlugin = name => Bukkit.getPluginManager().getPlugin(name || 'Cauldron');

export const isWildcardPermission = permission => /^(\w+\.)*\*$/ig.test(permission);