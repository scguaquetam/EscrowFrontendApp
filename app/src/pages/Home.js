import React from 'react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from '../deploy';
import Escrow from '../Escrow';
import Header from '../components/Header';
import { Card, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const getAccounts = async() => {
    const accounts = await provider.send('eth_requestAccounts', []);
    setAccount(accounts[0]);
    setSigner(provider.getSigner());
    setIsConnected(true);
  };
  const logOut = async () => {
    setIsConnected(false);
    setAccount(null);
    setSigner(null);
  }



  const [escrows, setEscrows] = useState([]);

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.BigNumber.from(document.getElementById('wei').value);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);


    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  return (
    <React.Fragment>
      <Header 
        isConnected={isConnected}
        logOut={logOut}
        getAccounts={getAccounts}
        account={account}
      />
      <Card className="contract text-center">
        <Card.Header>
          <h1> Create A New Contract </h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <h6>Arbiter Address</h6>
              <input type="text" id="arbiter" />
            </Col>
            <Col>
              <h6>Beneficiary Address</h6>
              <input type="text" id="beneficiary" />
            </Col>
            <Col>
              <h6>Deposit Amount (in Eth)</h6>
              <input type="text" id="wei" />
            </Col>
          </Row>
        </Card.Body>
        <Button variant="primary" size='sm'
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </Button>
      </Card>

      <Card className="existing-contracts text-center">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </Card>
    </React.Fragment>

  );
}

export default Home;
