## install

npm install vue-fixed-block --save

## use

```html
<fixed-block>
  content
</fixed-block>
```
example app

```js
import FixedBlock from 'vue-fixed-block'
Vue.use(FixedBlock)
```

## screenshot
![fix screen](demo/screenshot/demo.gif)



### fixed-block properties
| Name   | Type  | Required | Default | Description |
| ------ |:-----:| :---------:| --------|:---------|
| fix-delay | Number | false | 2 | |

### ui-box events
| Name   | params | Description |
| ------ |:-----:|:---------|
| change-fix | fixed |  |
