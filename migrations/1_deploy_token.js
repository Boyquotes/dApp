const Leaf = artifacts.require("Leaf");

module.exports = function (deployer) {
  deployer.deploy(Leaf);
};
