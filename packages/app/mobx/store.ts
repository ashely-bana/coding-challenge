
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import { observable } from "mobx"
interface Asset {
  name: string,
  imgSrc: string
}
export class PoolStore {
  id = observable.box('')
  token1 = observable({ name: '', imgSrc: '' })
  token2 = observable({ name: '', imgSrc: '' })
  poolLiquidity = observable.box(0)
  apr = observable.box(0)
  myLiquidity = observable.box(0)
  myBoundedAmount = observable.box(0)
  longestDaysUnbonding = observable.box(true)

  constructor() {
    makeAutoObservable(this)
  }

  @action setValue(key: string, value: any) {
    this[key] = value
  }

  addAsset(asset: Asset) {
    let tokenLen = 1;
    Object.keys(this).forEach(element => {
      if (element.indexOf('token') > -1 && this[element].name !== '') {
        tokenLen++
      }
    })
    this['token' + tokenLen].name = asset.name
    this['token' + tokenLen].imgSrc = asset.imgSrc
  }

  updateAsset(asset: Asset) {
    Object.keys(this).forEach(element => {
      if (this[element].name == asset.name) {
        this[element].imgSrc = asset.imgSrc
      }
    });
  }

  removeAsset(asset: Asset) {
    Object.keys(this).forEach(element => {
      if (this[element].name == asset.name) {
        delete this[element]
      }
    });
  }

  addPool(asset1: Asset, asset2: Asset) {
    this.token1.name = asset1.name
    this.token1.imgSrc = asset1.imgSrc
    this.token2.name = asset2.name
    this.token2.imgSrc = asset2.imgSrc
  }
}
let myPoolStore = new PoolStore()

export default myPoolStore 