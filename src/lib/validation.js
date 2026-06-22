const ETH_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/;

export function isValidEthAddress(address) {
  return ETH_ADDRESS_REGEX.test(address);
}

export function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
