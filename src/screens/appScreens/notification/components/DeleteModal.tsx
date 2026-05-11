import React, { useState } from "react";
import { wp, hp } from "../../../../utils/responsive";
import RedDelete from "../../../../assets/images/RedDelete.svg";
import BlueTick from "../../../../assets/images/BlueTick.svg";
import ModalSheet from "../../../common/ModalSheet";

type Props = {
  visible: boolean;
  deleteSuccess: boolean;
  onConfirm: () => void;
  onDone: () => void;
};

const DeleteModal: React.FC<Props> = ({
  visible,
  deleteSuccess,
  onConfirm,
  onDone,
}) => {

  if (!deleteSuccess) {
    return (
      <ModalSheet
        visible={visible}
        onRequestClose={onDone}
        showCloseButton={true}
        icon={<RedDelete width={wp("25%")} height={wp("25%")} />}
        title="Delete Notification"
        subtitle="Are you sure you want to delete this notification?"
        buttonTitle="Delete"
        onButtonPress={onConfirm}
      />
    );
  }

  return (
    <ModalSheet
      visible={visible}
      onRequestClose={onDone}
      showCloseButton={false}
      icon={<BlueTick width={wp("30%")} height={hp("15%")} />}
      title="Deleted Successfully"
      subtitle="Your notification has been deleted successfully"
      autoClose
      autoCloseDelay={1000}
      onAutoClose={onDone}
    />
  );
};

export default DeleteModal;