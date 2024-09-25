import React, { useState } from "react";
import { Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { BaseInput } from "../../../shared/components";
import { CommentsThunks } from "../../../redux/thunks";
import { CommentsSelector } from "../../../redux/selectors";

const CommentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const comment = useSelector(CommentsSelector.selectComment);
  const [form] = Form.useForm();
  const body = Form.useWatch("body", form);

  const onFinish = async (values) => {
    const data = JSON.stringify({
      body: values.body,
      postId: comment.postId,
      userId: comment.user.id,
    });

    setIsLoading(true);
    await dispatch(CommentsThunks.addComment(data));
    form.resetFields();
    setIsLoading(false);
  };

  return (
    <Form
      form={form}
      className="w-100"
      // initialValues={{ body: "hello world" }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item name="body">
        <BaseInput
          className="w-100"
          type="textarea"
          label="Comment"
          placeholder="Add your comment"
          autoSize={{ minRows: 4 }}
        />
      </Form.Item>

      <Form.Item className="m-l-a w-100">
        <Button
          className="w-100"
          htmlType="submit"
          disabled={isLoading || !body}
          loading={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
