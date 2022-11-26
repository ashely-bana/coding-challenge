import React, { useState, useEffect } from "react";
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import { observable } from "mobx"

import Pools from '../components/pools-list';
interface PoolsData {
  id: string;
  token1: { name: string, imgSrc: string };
  token2: { name: string, imgSrc: string };
  poolLiquidity: number;
  apr: number;
  myLiquidity: number;
  myBoundedAmount: number;
  longestDaysUnbonding: boolean;
}
class PoolStore {
  poolsDataItem: PoolsData = {
    id: '',
    token1: { name: '', imgSrc: '' },
    token2: { name: '', imgSrc: '' },
    poolLiquidity: 0,
    apr: 0,
    myLiquidity: 0,
    myBoundedAmount: 0,
    longestDaysUnbonding: true,
  }

  constructor() {
    makeAutoObservable(this)
  }

  addAsset(asset: any) {
    let tokenLen = 0;
    Object.keys(this.poolsDataItem).forEach(element => {
      if (element.indexOf('token') > -1 && this.poolsDataItem[element].name !== '') {
        tokenLen++
      }
    })
    this.poolsDataItem['token' + tokenLen].name = asset.name
    this.poolsDataItem['token' + tokenLen].imgSrc = asset.imgSrc
  }

  updateAsset(asset: any) {
    Object.keys(this.poolsDataItem).forEach(element => {
      if (this.poolsDataItem[element].name == asset.name) {
        this.poolsDataItem[element].imgSrc = asset.imgSrc
      }
    });
  }

  removeAsset(asset: any) {
    Object.keys(this.poolsDataItem).forEach(element => {
      if (this.poolsDataItem[element].name == asset.name) {
        delete this.poolsDataItem[element]
      }
    });
  }

  addPool(asset1: any, asset2: any) {
    this.poolsDataItem.token1.name = asset1.name
    this.poolsDataItem.token1.imgSrc = asset1.imgSrc
    this.poolsDataItem.token2.name = asset2.name
    this.poolsDataItem.token2.imgSrc = asset2.imgSrc
  }
}

const myPoolStore = new PoolStore()
// export default function Index() {
//   return (<>
//     <Pools />
//   </>
//   );
// }

const Index = observer(() => {
  return (<>
    <Pools PoolStore={myPoolStore} />
  </>
  );
})

export default Index