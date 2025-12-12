import { expect } from "chai";
import hre from "hardhat";

describe('Spacebear', () => {
  it('is possible to mint a token', async () => {
    const Spacebear = await hre.ethers.getContractFactory("Spacebear");
    const [deployer, otherAccount] = await hre.ethers.getSigners();
    const spacebearInstance = await Spacebear.deploy(deployer.address);
    await spacebearInstance.waitForDeployment();
    await spacebearInstance.safeMint(otherAccount.address, 'ipfs://test-token');
    expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
  });

  it('fails to transfer tokens from the wrong address', async () => {
    const Spacebear = await hre.ethers.getContractFactory("Spacebear");
    const [deployer, nftOwnerAccount, notNftOwnerAccount] =
      await hre.ethers.getSigners();
    const spacebearInstance = await Spacebear.deploy(deployer.address);
    await spacebearInstance.waitForDeployment();
    await spacebearInstance.safeMint(
      nftOwnerAccount.address,
      'ipfs://test-token'
    );
    expect(await spacebearInstance.ownerOf(0)).to.equal(
      nftOwnerAccount.address
    );

    await expect(
      spacebearInstance
        .connect(notNftOwnerAccount)
        .transferFrom(
          nftOwnerAccount.address,
          notNftOwnerAccount.address,
          0
        )
    ).to.be.revertedWithCustomError(
      spacebearInstance,
      "ERC721InsufficientApproval"
    );
  });
});
