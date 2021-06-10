import { task } from 'hardhat/config';
import { deployLendingPoolAddressesProviderRegistry } from '../../helpers/contracts-deployments';
import { registerContractInJsonDb } from '../../helpers/contracts-helpers';
import { waitForTx, notFalsyOrZeroAddress } from '../../helpers/misc-utils';
import { eContractid } from '../../helpers/types';
task('full:deploy-address-provider-registry', 'Deploy address provider registry')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');
    const { LendingPoolAddressesProviderRegistry } = eContractid;

    const contract = await deployLendingPoolAddressesProviderRegistry(verify);
    await registerContractInJsonDb(LendingPoolAddressesProviderRegistry, contract);
  });
