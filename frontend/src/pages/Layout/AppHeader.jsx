import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  color: "#111",
  height: 100,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  textAlign: "center",
};

export default function AppHeader() {
  const [modal, setModal] = useState(false)
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const {crypto} = useCrypto()

  function handleSelect(value){
    setModal(true)
    setCoin(crypto.find((c) => c.id === value))
  }
  return (
    <Layout.Header style={headerStyle}>
      <Select
      onSelect={handleSelect}
        value={"PRESS / TO OPEN"}
        style={{ width: 250 }}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
           <img 
           width={20}
           src={option.data.icon} 
           alt={option.data.label} />{''}
           {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

       <Modal
        open={modal}
        onCancel={()=> setModal(false)}
        footer={null}
      >
       <CoinInfoModal coin={coin}/>
      </Modal>

       <Drawer
       destroyOnHidden='true'
       width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  );
}
