import React from "react";
import ModalSheet from "./ModalSheet";

type Props = {
    visible: boolean;
    onConfirm: () => void;
    onDone: () => void;

    // customizable props
    icon?: React.ReactNode;
    title?: string;
    subtitle?: string;
    buttonTitle?: string;
    showCloseButton?: boolean;
};

const DeleteModal: React.FC<Props> = ({
    visible,
    onConfirm,
    onDone,
    icon,
    title,
    subtitle,
    buttonTitle,
    showCloseButton = true,
}) => {
    return (
        <ModalSheet
            visible={visible}
            onRequestClose={onDone}
            showCloseButton={showCloseButton}
            icon={icon}
            title={title}
            subtitle={subtitle}
            buttonTitle={buttonTitle}
            onButtonPress={onConfirm}
        />
    );
};

export default DeleteModal;