> Antd 是阿里开发的一套 UI 库，由于其主要依赖 rmc 相关的插件，所以这里会从 rmc 代码和 antd 代码两边进行阅读，主要是看 ant-design，也就是 PC 的代码

## Form 组件

作为常用处理表单的业务组件，其兼容了很多处理方式和业务场景，也是一个相对比较复杂的组件

### createFormField

从最简单的文件着手，这里可以看到其表单字段类，到时，会将表单字段都封装成 Field 实例

```js
class Field {
  constructor(fields) {
    Object.assign(this, fields);
  }
}
new Field({ a: 1 })-- > Field实例;
```

### createFieldsStore

上面的文件是对单个字段的维护，那么这里就是对所有字段的维护

```js
class FieldsStore {
  constructor(fields) {
    this.fields = internalFlattenFields(fields);
  }
}
```

// internalFlattenFields

首先该 fields 是由上层 mapPropsToFields 生成的对象，mapPropsToFields 就是将 props 中的表单内容转化为 Field 实例

```js
function mapPropsToFields(props) {
  return {
    username: createFormField({value: 'zjf'}),
    password: createFormField({value: 'ddd'})
  };
}
```

hoist-non-react-statics 插件，将两个组件合并，类似于 Object.assign
