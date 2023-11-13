import React from 'react';
import Table from 'react-bootstrap/Table';
import { web3 } from '.';
import { stakingABI, stakingAddress } from '@/utils/Stake'
export default function DataTable() {
    const walletAddress = sessionStorage.getItem("address")
    const [StakeList, setStakeList] = React.useState<any>([])
    const stakeInstance = new web3.eth.Contract(stakingABI, stakingAddress)


    async function list(userAddress: string) {
        let array = [3, 6, 12];
        let userDetails = []
        for (let i = 0; i < 3; i++) {
            //@ts-ignore
            const list = await stakeInstance.methods.userMonthToAmount(userAddress, array[i]).call()
            userDetails.push(list)
        }
        console.log(userDetails);
        setStakeList(userDetails)
    }

    React.useEffect(() => {
        if (walletAddress !== null) {
            list(walletAddress)
        }
    }, [])
    const [RewardValue, setRewardValue] = React.useState([])
    let rewardVal: any = []
    // const stakeInstance = new web3.eth.Contract(stakingABI, stakingAddress)
    async function rewardEstimate(amount: any, month: any) {
        const setMonth = {
            0: 3,
            1: 6,
            2: 12
        }
        const value = web3.utils.toWei(amount, "ether")
        const interestRate = {
            3: 22,
            6: 45,
            12: 100
        }
        //@ts-ignore
        console.log(value, interestRate[setMonth[month]], setMonth[month]);

        //@ts-ignore
        await stakeInstance.methods.calculateReward(value, interestRate[setMonth[month]], setMonth[month])
            .call()
            .then((data: any) => {
                // const reward = web3.utils.fromWei(data, "ether")
                rewardVal.push(data)
                setRewardValue(rewardVal)
                console.log({rewardVal, data});
                // return reward
                // setRewardAmount(reward)
            }).catch((error: any) => {
                console.log(error);
            })
    }

console.log({RewardValue});

    React.useEffect(() => {

        StakeList.map((item: any, index: any) => {
            rewardEstimate(web3.utils.fromWei(item.amount, "ether"), index)
        })
    }, [StakeList])


    return (

        StakeList.length === 0 ?
            <h1 className='text-center'></h1>
            :
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Stake Amount</th>
                        <th>Stake Month</th>
                        <th>Reward</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{StakeList[0].amount ? web3.utils.fromWei(StakeList[0].amount, "ether") : "NA"}</td>
                        <td>3</td>
                        <td>{RewardValue.length > 0 ? web3.utils.fromWei((Number(StakeList[0].amount)*22*3)/(1000*12), "ether") : "NA"}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{StakeList[1].amount ? web3.utils.fromWei(StakeList[1].amount, "ether") : "NA"}</td>
                        <td>6</td>
                        <td>{RewardValue.length > 0 ? web3.utils.fromWei((Number(StakeList[1].amount)*45*6)/(1000*12), "ether") : "NA"}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{StakeList[2].amount ? web3.utils.fromWei(StakeList[2].amount, "ether") : "NA"}</td>
                        <td>12</td>
                        <td>{RewardValue.length > 0 ? web3.utils.fromWei((Number(StakeList[2].amount)*100*12)/(1000*12), "ether") : ""}</td>
                    </tr>
                </tbody>
            </Table>

    );
}