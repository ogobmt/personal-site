import { euclideanDistance } from "../utils/mathHelpers";

const normalCollision = (speeds, multiplier, nodes) =>
  _handleCollision(speeds, multiplier, nodes, _updateHandlerNormal);

const collisionMaximizedByLeastWealth = (speeds, multiplier, nodes) =>
  _handleCollision(speeds, multiplier, nodes, _updateHandlerLeastWealth);

const _handleCollision = (speeds, multiplier, nodes, updateHandler) => {
  const originalEnergies = nodes.map(node => speeds[node.i] ** 2);
  const newEnergies = nodes.map(
    node => (euclideanDistance(node.vx, node.vy) / multiplier) ** 2
  );

  // leave early if unpausing
  if (newEnergies[0] === 0 && newEnergies[1] === 0) return speeds;

  const epsilon = newEnergies[0] / (originalEnergies[0] + originalEnergies[1]);
  const updatedNewEnergies = updateHandler(epsilon, originalEnergies);
  const newSpeeds = [...speeds];
  nodes.forEach((node, idx) => {
    const scaleFactor = (updatedNewEnergies[idx] / newEnergies[idx]) ** (1 / 2);
    node.vx *= scaleFactor;
    node.vy *= scaleFactor;
    newSpeeds[node.i] = euclideanDistance(node.vx, node.vy) / multiplier;
  });
  return newSpeeds;
};

const _updateHandlerNormal = (eps, energies) => {
  if (Math.random() < 0.5) {
    const delta = eps * energies[1];
    return [energies[0] + delta, energies[1] - delta];
  } else {
    const delta = eps * energies[0];
    return [energies[0] - delta, energies[1] + delta];
  }
};

const _updateHandlerLeastWealth = (eps, energies) => {
  const delta = eps * Math.min(...energies);
  return Math.random() < 0.5
    ? [energies[0] + delta, energies[1] - delta]
    : [energies[0] - delta, energies[1] + delta];
};

const updateSpeeds = [normalCollision, collisionMaximizedByLeastWealth];

export default updateSpeeds;
