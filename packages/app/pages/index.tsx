import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite"

import Pools from '../components/pools-list';
import PoolStore from '../mobx/store'

// export default function Index() {
//   return (<>
//     <Pools />
//   </>
//   );
// }

const Index = observer(() => {
  return (<>
    <Pools PoolStore={PoolStore} />
  </>
  );
})

export default Index