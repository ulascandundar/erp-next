"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <>
          <Button type="primary" onClick={() => router.back()}>
            Go Back
          </Button>
        </>
      }
    />
  );
}
