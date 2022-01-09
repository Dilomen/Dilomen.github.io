## 概述

### 源码位置

首先从引入方式得知,Hooks 都是从 react 中导出的

```js
import { useXXX } from 'react';
```

所以先找到 react 文件夹，然后根据 main,最终定位到 ReactHooks.js 文件

```md
packages/react/src/ReactHooks.js;
```

发现这边的useHooks都是调用了react-reconciler下的实现，所以直接看

```js
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher;
}

export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useXXX<S>()
....
```

```js
import type {Dispatcher} from 'react-reconciler/src/ReactInternalTypes';

const ReactCurrentDispatcher = {
  current: (null: null | Dispatcher),
};
```

react-reconciler/src/ReactFiberReconciler[createContainer] =>  ReactFiberRoot.new[createFiberRoot] => ReactFiber.new[createFiber]



react-reconciler/src/ReactFiberReconciler[updateContainer] => ReactFiberWorkLoop.new[originalBeginWork] => ReactFiberBeginWork.new[renderWithHooks]
## useState
