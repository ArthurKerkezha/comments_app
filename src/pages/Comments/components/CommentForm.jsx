import React from "react";
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { BaseInput } from "../../../shared/components";
import { CommentsThunks } from "../../../redux/thunks";

const CommentForm = () => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);

    const data = JSON.stringify({
      body: values.body,
      postId: 44,
      userId: 9,
    });

    await dispatch(CommentsThunks.addComment(data));
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Form
      className="w-100"
      initialValues={{}}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="body">
        <BaseInput
          className="w-100"
          type="textarea"
          label="Comment"
          autoSize={{ minRows: 4 }}
        />
      </Form.Item>

      <Form.Item className="m-l-a">
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
