var ERC721MintableComplete = artifacts.require('R2Token');

contract('ERC721Mintable R2Token', accounts => {

    const owner = accounts[0];

    const acc_1 = accounts[1];
    const acc_2 = accounts[2];
    const acc_3 = accounts[3];

    const acc_1_count = 3;
    const acc_2_count = 10;
    const acc_3_count = 99;

    describe('should match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: owner});
            //mint multiple tokens
            for(let i = 0; i < acc_1_count; ++i){
                await this.contract.mint(acc_1, i + acc_1_count);
            }
            for(let i = 0; i < acc_2_count; ++i){
                await this.contract.mint(acc_2, i + acc_2_count);
            }
            for(let i = 0; i < acc_3_count; ++i){
                await this.contract.mint(acc_3, i + acc_3_count);
            }
        })

        it('should return total supply', async function () { 
            let total_supply = await this.contract.totalSupply.call({from: owner});
            assert.equal(total_supply, acc_1_count + acc_2_count + acc_3_count, "Does not match actual supply");  
        })

        it('should get token balance', async function () { 
            let balance_1 = await this.contract.balanceOf.call(acc_1);
            let balance_2 = await this.contract.balanceOf.call(acc_2);
            let balance_3 = await this.contract.balanceOf.call(acc_3);
            assert.equal(balance_1 , acc_1_count, "Does not match balance of account #1");
            assert.equal(balance_2 , acc_2_count, "Does not match balance of account #2");
            assert.equal(balance_3, acc_3_count, "Does not match balance of account #3");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenId = 3;
            let base_token_uri = await this.contract.getBaseTokenURI.call({from: owner});
            let token_uri = await this.contract.tokenURI.call(tokenId, {from: owner});
            assert.equal(
                token_uri,
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/" + tokenId,
                "Does not match expected tokenURI");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 3;
            await this.contract.safeTransferFrom(acc_1, acc_2, tokenId, {from: acc_1});
            let owner = await this.contract.ownerOf(tokenId);
            assert.equal(owner, acc_2, "Token not transferred");
        })
    });

    describe('should have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: owner});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let err = false;
            try {
                await this.contract.mint(acc_2, 6, {from: acc_1});
            } catch {
                err = true;
            }
            assert.equal(err, true, "Non contract owner can mint");
        })

        it('should return contract owner', async function () { 
            let c_owner = await this.contract.getOwner.call();
            assert.equal(c_owner, owner, "Contract owner not returned");
        })

    });
})