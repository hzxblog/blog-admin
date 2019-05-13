import React, { Component } from "react";
import { getDirList, deleteFile } from "../../request";
import { uploadUrl  } from "../../request/api";
import {
  message,
  Upload,
  Button,
  Modal,
  Switch,
  Tree,
  Card
} from 'antd';
import config from "../../config";

const confirm = Modal.confirm;
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const { Meta } = Card;

class Picture extends Component {

  state = {
    items: [],
    visible: false,
    pictureInfo: null,
    isOperate: false
  };

  componentDidMount() {
    this.getAttachments();
  }

  getAttachments() {
    return getDirList().then(res => {
      this.setState({
        items: res.data
      })
    })
  }

  copyUrl = (url) => {
    if (document.execCommand("copy")) {
      const input = document.createElement("input");
      input.style.position = "fixed";
      input.style.top = "0";
      input.style.zIndex = -1;
      document.body.appendChild(input);
      input.value = url;
      input.focus();
      input.setSelectionRange(0, input.value.length);
      document.execCommand("copy", true);
      document.body.removeChild(input);
      message.success(`Copied: ${url}`, 2);
    } else {
      message.warning( "浏览器不支持复制功能！", 2);
    }
  };

  delete = () => {
    confirm({
      title: '是否删除文件夹及其所有子文件？',
      onOk: () => {
        const { pictureInfo } = this.state;
        deleteFile(pictureInfo.filePath).then(async res => {
          await this.getAttachments();
          this.setState({
            visible: false,
          });
          message.success(res.data.message, 2);
        })
      },
      onCancel() {},
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  onSelect = (keys, { node : { props }}) => {
    if (!this.state.isOperate) return;
    const dataRef = props.dataRef;
    this.setState({
      pictureInfo: dataRef,
    });
    if (dataRef.type === 'file') {
      this.setState({
        visible: true,
      });
    } else {
      this.delete();
    }
  };

  onCheck = (checkedKeys) => {
    console.log(checkedKeys);
  };

  renderTreeNodes = (data) => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.filePath} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.filePath} isLeaf dataRef={item}/>;
  });

  onChange = (val) => {
    this.setState({
      isOperate: val
    });
  };

  render() {
    const { items, visible, pictureInfo } = this.state;
    const uploadProps = {
      name: 'file',
      action: `${config.baseUrl}${uploadUrl}`,
      headers: {
        Authorization: localStorage.getItem("token")
      },
      onChange:(info) => {
        if (info.file.status === 'done') {
          this.getAttachments();
          message.success(`${info.file.name} 图片上传成功。`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 图片上传失败。`);
        }
      },
      beforeUpload: (file, fileList) => {
        const types = ["image/jpeg", "image/png", "image/svg", "image/gif"];
        if (types.includes(file.type)) {
          return true;
        } else {
          fileList.pop();
          message.error(`只允许传图片格式文件！`);
          return false;
        }
      }
    };

    return (
      <div>
        <div style={{ marginBottom: "15px", display: 'flex' }}>
          <Upload {...uploadProps} showUploadList={false}>
            <Button icon="upload">上传</Button>
          </Upload>
          <Switch
            defaultChecked={false}
            checkedChildren="可操作"
            unCheckedChildren="不可操作"
            onChange={this.onChange}/>
        </div>
        <div style={{ overflowY: 'hidden'}}>
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            {this.renderTreeNodes(items)}
          </DirectoryTree>
        </div>
        <Modal
          title="图片"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="delete" type="primary" onClick={this.delete}>
              删除
            </Button>,
          ]}
        >
          {
            pictureInfo &&
            <Card
              hoverable
              cover={<img alt="picture" src={pictureInfo.path} />}
            >
              <Meta
                title={ pictureInfo.info  }
              />
            </Card>
          }
        </Modal>
      </div>
    )
  }
}

export default Picture;
