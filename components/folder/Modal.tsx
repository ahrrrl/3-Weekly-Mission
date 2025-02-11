import { ModalProps } from "../../types/types";
import { UserFolder, getUserFolders } from "../../api/api";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../../utils/Utils";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ModalLayout = ({ children }) => {
  return <div className={cx("modalLayout")}>{children}</div>;
};

const ModalContentBox = ({ children }) => {
  return <div className={cx("modalContent")}>{children}</div>;
};

const ModalButton = ({ buttonColor, onClick, text }) => {
  return (
    <button className={cx(`modal-button-${buttonColor}`)} onClick={onClick}>
      {text}
    </button>
  );
};

const ModalCloseButton = ({ closeModal }) => {
  return (
    <img
      src="/images/_close.png"
      className={cx("closeModal")}
      onClick={closeModal}
      alt="나가기"
    />
  );
};

const Modal = ({ children, closeModal, buttonColor, text }) => {
  return (
    <ModalLayout>
      <ModalContentBox>
        <ModalCloseButton closeModal={closeModal} />
        {children}
        <ModalButton
          buttonColor={buttonColor}
          onClick={closeModal}
          text={text}
        />
      </ModalContentBox>
    </ModalLayout>
  );
};

export const AddToFolderModal = ({ closeModal }: ModalProps) => {
  const [FolderList, setFolderList] = useState<UserFolder[]>();
  useEffect(() => {
    async function handleload() {
      setFolderList(await getUserFolders(4));
    }
    handleload();
  }, []);
  return (
    <Modal closeModal={closeModal} buttonColor="blue" text="추가하기">
      <div className={cx("modal-title-box")}>
        <div className={cx("modal-title")}>폴더에 추가하기</div>
        <div className={cx("modal-title-subtitle")}>링크 주소</div>
      </div>
      <ul className={cx("addToFolderModal-folderList")}>
        {FolderList?.map((folder) => {
          return (
            <li
              className={cx("addToFolderModal-folderName-box")}
              key={folder.id}
            >
              <div className={cx("addToFolderModal-folderName")}>
                {folder.name}
              </div>
              <div
                className={cx("addToFolderModal-folderLinkLength")}
              >{`${folder.link.count}개 링크`}</div>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
};

export const AddFolderModal = ({ closeModal }: ModalProps) => (
  <Modal closeModal={closeModal} buttonColor="blue" text="추가하기">
    <div className={cx("modal-title")}>폴더 추가</div>
    <input className={cx("modal-input")} />
  </Modal>
);

export const ShareModal = ({ closeModal, selectedModalName }: ModalProps) => (
  <Modal closeModal={closeModal} buttonColor="blue" text="닫기">
    <div className={cx("modal-title-box")}>
      <div className={cx("modal-title")}>폴더 공유</div>
      <div className={cx("modal-title-subtitle")}>{selectedModalName}</div>
    </div>
    <div className={cx("shareIcon-box")}>
      <div className={cx("shareIcon")}>
        <img src="/images/카카오톡아이콘.png" alt="카카오톡" />
        카카오톡
      </div>
      <div className={cx("shareIcon")}>
        <img src="/images/페이스북아이콘.png" alt="페이스북" />
        페이스북
      </div>
      <div className={cx("shareIcon")}>
        <img
          onClick={copyToClipboard}
          src="/images/링크복사아이콘.png"
          alt="링크복사"
        />
        링크 복사
      </div>
    </div>
  </Modal>
);

export const RenameModal = ({ closeModal, selectedModalName }: ModalProps) => (
  <Modal closeModal={closeModal} buttonColor="blue" text="변경하기">
    <div className={cx("modal-title")}>폴더 이름 변경</div>
    <input className={cx("modal-input")} defaultValue={selectedModalName} />
  </Modal>
);

export const DeleteFolderModal = ({
  closeModal,
  selectedModalName,
}: ModalProps) => (
  <Modal closeModal={closeModal} buttonColor="red" text="삭제하기">
    <div className={cx("modal-title-box")}>
      <div className={cx("modal-title")}>폴더 삭제</div>
      <div className={cx("modal-title-subtitle")}>{selectedModalName}</div>
    </div>
  </Modal>
);

export const DeleteItemModal = ({
  closeModal,
  selectedModalItem,
}: ModalProps) => (
  <Modal closeModal={closeModal} buttonColor="red" text="삭제하기">
    <div className={cx("modal-title-box")}>
      <div className={cx("modal-title")}>링크 삭제</div>
      <div className={cx("modal-title-subtitle")}>{selectedModalItem?.url}</div>
    </div>
  </Modal>
);
