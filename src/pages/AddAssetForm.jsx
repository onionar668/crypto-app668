import { Select, Space, Typography, Flex, Form, Divider, Button, InputNumber, DatePicker, Result } from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";

export default function AddAssetForm({onClose}) {
  const [form] = Form.useForm()
  const [coin, setCoin] = useState(null);
  const { crypto, addAsset} = useCrypto();
  const [submited, setSubmitted] = useState(false)
  const assetRef = useRef()


  if(submited){
    return  (
    <Result
    status="success"
    title="New asset added"
    subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        Close
      </Button>,
    ]}
    />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select Coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img width={20} src={option.data.icon} alt={option.data.label} />
            {""}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function handleAmountChange(value){
    form.setFieldsValue({
      total: (value * coin.price).toFixed(2)
    })
  }

  const validateMessages = {
  required: "${label} is required!",
  types: {
    number: '${label} is not valid number'
  },
  number :{
    range : '${label} must be between ${min} and ${max}'
  }
};

  function onFinish(values){
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date()
    }
    assetRef.current = newAsset
    setSubmitted(true)
    addAsset(newAsset)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{ 
        price: +coin.price.toFixed(2)
       }}
      onFinish={onFinish}
      validateMessages = {validateMessages}
    >
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, 
                  type: 'number',
                  min: 0
                }]}
      >
        <InputNumber onChange={handleAmountChange} style={{width: '100%'}}/>
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
      >
        <InputNumber disabled  style={{width: '100%'}} />
      </Form.Item>

      <Form.Item
        label="Date & Time"
        name="date"
      >
        <DatePicker showTime/>
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
      >
        <InputNumber  disabled  style={{width: '100%'}} />
      </Form.Item>


      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
         Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
