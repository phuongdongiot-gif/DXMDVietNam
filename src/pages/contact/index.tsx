import React, { useState } from "react";
import { Page, Box, Input, Button, Text } from "zmp-ui";
import toast from "react-hot-toast";

const ContactPage: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !phone) {
      toast.error("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    toast.success("Đã gửi yêu cầu tư vấn thành công!");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <Page className="flex flex-col bg-background">
      <Box p={4} className="bg-white">
        <Text size="xLarge" bold className="text-primary mb-4">
          Nhận thông tin tư vấn
        </Text>
        <Text size="small" className="text-gray-600 mb-4">
          Vui lòng để lại thông tin, chuyên viên tư vấn của Đất Xanh Miền Đông sẽ liên hệ hỗ trợ bạn trong thời gian sớm nhất.
        </Text>

        <div className="space-y-4">
          <Input 
            label="Họ và tên" 
            placeholder="Nhập họ và tên" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <Input 
            label="Số điện thoại" 
            placeholder="Nhập số điện thoại" 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          <Input.TextArea 
            label="Nhu cầu tư vấn" 
            placeholder="Bạn quan tâm dự án nào?" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            maxLength={255} 
            showCount 
          />
          <Button fullWidth onClick={handleSubmit} className="mt-4" size="large">
            Gửi yêu cầu tư vấn
          </Button>
        </div>
      </Box>
    </Page>
  );
};

export default ContactPage;
