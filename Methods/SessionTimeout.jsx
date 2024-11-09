import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function SessionTimeout() {
  const navigate = useRouter();
  const [state, setState] = useState("Active");
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onIdle = () => {
    toggle();
    setState("Idle");
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };
  const handleClose = () => {
    toggle();
    signOut();
    navigate.push("/");
    localStorage.clear();
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 900_000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} backdrop={"static"}>
        <ModalHeader>Session Timeout</ModalHeader>
        <ModalBody>
          <p>You are being timed out due to inactivity.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default SessionTimeout;
