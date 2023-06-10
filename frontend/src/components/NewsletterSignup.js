import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  //fetcher.Form은 액션을 트리거하지만 페이지 이동이 없을 때 사용 가능
  //즉 페이지 전환 없이 loader,action등에 접근해 요청을 전송할 떄 사용한다
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  //data, state중 하나가 변경될 시 함수를 트리거할 수 있음
  useEffect(() => {
    //액션이나 로더를 실행하지않고있는지 확인 && 데이터를 받았거나 메세지 프로퍼티가 있다면
    if (state === "idle" && data && data.message) {
      window.alert("Signup successful! : ", data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
