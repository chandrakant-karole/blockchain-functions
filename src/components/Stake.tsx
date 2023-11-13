import { web3 } from '@/utils'
import { coinABI, coinAddress } from '@/utils/Coin'
import { stakingABI, stakingAddress } from '@/utils/Stake'
import React from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

export default function Stake({ WalletAddress }: { WalletAddress: string }) {
    const [StakeAmount, setStakeAmount] = React.useState('')
    const [StakeMonth, setStakeMonth] = React.useState('')
    const [UnStakeMonth, setUnStakeMonth] = React.useState('')


    const stakeInstance = new web3.eth.Contract(stakingABI, stakingAddress)
    const coinInstance = new web3.eth.Contract(coinABI, coinAddress)
    async function onStake() {
        //basic validation
        if (!WalletAddress) {
            alert("please connect wallet")
            return
        } else if (!StakeAmount) {
            alert("please enter stake amount")
            return
        } else if (!StakeMonth) {
            alert("please enter stake month")
            return
        }
        //calling approve method
        const value = web3.utils.toWei(StakeAmount, "ether")
        //@ts-ignore
        coinInstance.methods.approve(coinAddress, value)
            .send({ from: WalletAddress })
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })

        //calling stake method
        // @ts-ignore
        await stakeInstance.methods.stake(value, StakeMonth)
            .send({ from: WalletAddress })
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    }

    async function onUnStake() {
        if (!WalletAddress) {
            alert("please connect wallet")
            return
        } else if (!UnStakeMonth) {
            alert("please enter unStake month")
            return
        }
        // @ts-ignore
        await stakeInstance.methods.unstake(UnStakeMonth)
            .send({ from: WalletAddress })
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    }

    async function rewardEstimate() {
        //@ts-ignore
        await stakeInstance.methods.calculateReward("amount", "interestRate", "month")
            .send({ from: WalletAddress })
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    }

    //Coin
    // async function addToken() {
    //     const coinInstance = new web3.eth.Contract(coinABI, coinAddress)
    //     // await coinInstance.methods.
    //     const tokenAddress = coinAddress;
    //     const tokenSymbol = 'Dummy';
    //     const tokenDecimals = 18;
    //     const tokenImage = "";

    //     try {
    //         // wasAdded is a boolean. Like any RPC method, an error can be thrown.
    //         const wasAdded = await window.ethereum.request({
    //             method: 'wallet_watchAsset',
    //             params: {
    //                 type: 'ERC20', // Initially only supports ERC-20 tokens, but eventually more!
    //                 options: {
    //                     address: tokenAddress, // The address of the token.
    //                     symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
    //                     decimals: tokenDecimals, // The number of decimals in the token.
    //                     image: tokenImage, // A string URL of the token logo.
    //                 },
    //             },
    //         });

    //         if (wasAdded) {
    //             console.log('Thanks for your interest!');
    //         } else {
    //             console.log('Your loss!');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    return (
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={4}>

                        <InputGroup>
                            <Form.Control
                                onChange={(e) => setStakeAmount(e.target.value)}
                                value={StakeAmount}
                                min={0.001}
                                type='number'
                                placeholder="stake amount"
                                aria-label="stake amount"
                                aria-describedby="basic-addon2"
                            />
                            <Form.Control
                                onChange={(e) => setStakeMonth(e.target.value)}
                                value={StakeMonth}
                                min={1}
                                type='number'
                                placeholder="stake month"
                                aria-label="stake month"
                                aria-describedby="basic-addon3"
                            />
                            <button onClick={onStake} className='main m-0'>stake</button>
                        </InputGroup>
                        <Form.Text className='text-white mb-3 d-block'>
                            Estimated Reward : 00.00
                        </Form.Text>
                    </Col>
                    <Col lg={4}>
                        <InputGroup>
                            <Form.Control
                                onChange={(e) => setUnStakeMonth(e.target.value)}
                                value={UnStakeMonth}
                                min={1}
                                type='number'
                                placeholder="stake month"
                                aria-label="stake month"
                                aria-describedby="basic-addon3"
                            />
                            <button onClick={onUnStake} className='main m-0'>unStake</button>
                        </InputGroup>
                        {/* <button onClick={addToken}>add</button> */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
