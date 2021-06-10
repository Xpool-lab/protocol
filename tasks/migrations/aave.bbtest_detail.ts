import { task } from 'hardhat/config';
import { checkVerification } from '../../helpers/etherscan-verification';
import { ConfigNames } from '../../helpers/configuration';
import { printContracts } from '../../helpers/misc-utils';
import { usingTenderly } from '../../helpers/tenderly-utils';
import { deployLendingPool } from '../../helpers/contracts-deployments';

task('aave:bbtest_detail', 'Deploy development enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    const POOL_NAME = ConfigNames.Aave;
    await DRE.run('set-DRE');

    // Prevent loss of gas verifying all the needed ENVs for Etherscan verification
    if (verify) {
      checkVerification();
    }

    // Deploy lending pool
    const lendingPoolImpl = await deployLendingPool(verify);

    if (verify) {
      printContracts();
      console.log('4. Veryfing contracts');
      await DRE.run('verify:general', { all: true, pool: POOL_NAME });

      console.log('5. Veryfing aTokens and debtTokens');
      await DRE.run('verify:tokens', { pool: POOL_NAME });
    }

    if (usingTenderly()) {
      const postDeployHead = DRE.tenderlyRPC.getHead();
      console.log('Tenderly UUID', postDeployHead);
    }
    console.log('\nFinished migrations');
    printContracts();
  });
