import { Input,Select } from 'antd';
import React from 'react';
const {Option} = Select
function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    let valueTemp = value;
    if (value && (value.charAt(value.length - 1) === '.' || value === '-')) {
      valueTemp = value.slice(0, -1);
    }
    if(valueTemp){
      onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
    ) : (
      'Input a number'
    );
    console.log(title)
    return (
          <Input.Group compact>
          <Select defaultValue="+91" style={{ width: '20%' }}>
            <Option value="+91">+91</Option>
            </Select>
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder="Input phone number"
          max={10} style={{ width: '80%' }}
        />
        
        </Input.Group>
    );
  }
}


export default NumericInput