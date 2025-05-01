// components/RegistrationForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";

// InputField 컴포넌트의 props 타입 정의
interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

// 재사용 가능한 입력 필드 컴포넌트
const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* 입력 필드 라벨 */}
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {/* 에러 메시지 표시 */}
      {error && (
        <span style={{ color: "red", fontSize: "0.8rem" }}>{error}</span>
      )}
    </div>
  );
};

// 폼 데이터의 타입 정의
interface FormData {
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  userName: string;
  lastNameKanji: string;
  firstNameKanji: string;
  lastNameKana: string;
  firstNameKana: string;
  phone: string;
}

// 에러 메시지 타입 정의 (각 필드별로 옵셔널)
interface FormErrors {
  email?: string;
  emailConfirm?: string;
  password?: string;
  passwordConfirm?: string;
  userName?: string;
  lastNameKanji?: string;
  firstNameKanji?: string;
  lastNameKana?: string;
  firstNameKana?: string;
  phone?: string;
}

const RegistrationForm: React.FC = () => {
  // 현재 진행 단계 관리 (0: 기본 정보, 1: 추가 정보, 2: 약관 동의)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // 입력된 폼 데이터를 저장하는 상태
  const [formData, setFormData] = useState<FormData>({
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    lastNameKanji: "",
    firstNameKanji: "",
    lastNameKana: "",
    firstNameKana: "",
    phone: "",
  });

  // 각 필드별 에러 메시지를 저장하는 상태
  const [errors, setErrors] = useState<FormErrors>({});

  // 각 스텝에 대한 제목 배열
  const steps: string[] = ["基本情報入力", "追加情報入力", "利用規約同意"];

  // 입력 값 변경 시 호출되는 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // formData 업데이트
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 해당 필드 에러 초기화
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  //  漢字とカタカナVaildCheck
  const isValidKanji = (text: string): boolean => {
    const kanjiRegex = /^[\u4E00-\u9FFF]+$/;
    return kanjiRegex.test(text);
  };
  const isValidKatakana = (text: string): boolean => {
    const katakanaRegex = /^[\u30A0-\u30FF]+$/;
    return katakanaRegex.test(text);
  };

  // 현재 스텝에 대한 유효성 검사 함수
  const validateStep = (): boolean => {
    let currentErrors: FormErrors = {};

    if (currentStep === 0) {
      // 이메일 및 재입력
      if (!formData.email) {
        currentErrors.email = "メールアドレスを入力してください。";
      }
      if (!formData.emailConfirm) {
        currentErrors.emailConfirm = "メールアドレス再入力を入力してください。";
      }
      if (
        formData.email &&
        formData.emailConfirm &&
        formData.email !== formData.emailConfirm
      ) {
        currentErrors.emailConfirm = "メールアドレスが一致しません。";
      }
      // 간단한 이메일 형식 검사
      const emailRegex = /\S+@\S+\.\S+/;
      if (formData.email && !emailRegex.test(formData.email)) {
        currentErrors.email = "有効なメールアドレスを入力してください。";
      }

      // 패스워드 및 재입력
      if (!formData.password) {
        currentErrors.password = "パスワードを入力してください。";
      }
      if (!formData.passwordConfirm) {
        currentErrors.passwordConfirm = "パスワード再入力を入力してください。";
      }
      if (
        formData.password &&
        formData.passwordConfirm &&
        formData.password !== formData.passwordConfirm
      ) {
        currentErrors.passwordConfirm = "パスワードが一致しません。";
      }

      // 사용자명 (유저명)
      if (!formData.userName) {
        currentErrors.userName = "ユーザー名を入力してください。";
      }

      // "漢字とカタカナ" Vaildの条件式
      if (!formData.lastNameKanji) {
        currentErrors.lastNameKanji = "姓（漢字）を入力してください。";
      } else if (!isValidKanji(formData.lastNameKanji)) {
        currentErrors.lastNameKanji = "有効な漢字のみを入力してください。";
      }
      if (!formData.firstNameKanji) {
        currentErrors.firstNameKanji = "名（漢字）を入力してください。";
      } else if (!isValidKanji(formData.firstNameKanji)) {
        currentErrors.firstNameKanji = "有効な漢字のみを入力してください。";
      }
      // カタカナ 이름 검증 (성, 이름)
      if (!formData.lastNameKana) {
        currentErrors.lastNameKana = "姓（カタカナ）を入力してください。";
      } else if (!isValidKatakana(formData.lastNameKana)) {
        currentErrors.lastNameKana = "有効なカタカナのみを入力してください。";
      }
      if (!formData.firstNameKana) {
        currentErrors.firstNameKana = "名（カタカナ）を入力してください。";
      } else if (!isValidKatakana(formData.firstNameKana)) {
        currentErrors.firstNameKana = "有効なカタカナのみを入力してください。";
      }
    }

    if (currentStep === 1) {
      // 전화번호 검증 (추가 정보)
      if (!formData.phone) {
        currentErrors.phone = "電話番号を入力してください。";
      }
    }

    // 약관 동의 단계는 추후 체크박스 등으로 구현 가능

    // 에러 상태 업데이트
    setErrors(currentErrors);
    // 에러가 없으면 true 반환
    return Object.keys(currentErrors).length === 0;
  };

  // '다음' 버튼 클릭 시 호출
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // '이전' 버튼 클릭 시 호출
  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // 최종 제출 시 호출
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("회원가입 데이터 제출:", formData);
      // 실제 API 연동 로직 추가 가능 (fetch, axios 등)
      alert("会員登録が完了しました！");
    }
  };

  // 현재 스텝에 따라 렌더링할 폼 내용을 결정하는 함수
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            {/* 이메일 입력 */}
            <InputField
              label="メールアドレス (必須)"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              error={errors.email}
            />
            <InputField
              label="メールアドレス再入力 (必須)"
              type="email"
              name="emailConfirm"
              value={formData.emailConfirm}
              onChange={handleChange}
              placeholder="example@mail.com"
              error={errors.emailConfirm}
            />
            {/* 패스워드 입력 */}
            <InputField
              label="パスワード (必須)"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="パスワードを入力"
              error={errors.password}
            />
            <InputField
              label="パスワード再入力 (必須)"
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="パスワードを再入力"
              error={errors.passwordConfirm}
            />
            {/* 사용자명 입력 */}
            <InputField
              label="ユーザー名"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="ユーザー名を入力"
              error={errors.userName}
            />
            {/* 한자 이름 입력 (성, 이름 같은 줄에 배치) */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: "0 0 48%" }}>
                <InputField
                  label="姓（漢字） (必須)"
                  type="text"
                  name="lastNameKanji"
                  value={formData.lastNameKanji}
                  onChange={handleChange}
                  placeholder="姓を入力"
                  error={errors.lastNameKanji}
                />
              </div>
              <div style={{ flex: "0 0 48%" }}>
                <InputField
                  label="名（漢字） (必須)"
                  type="text"
                  name="firstNameKanji"
                  value={formData.firstNameKanji}
                  onChange={handleChange}
                  placeholder="名を入力"
                  error={errors.firstNameKanji}
                />
              </div>
            </div>
            {/* 카타카나 이름 입력 (성, 이름 같은 줄에 배치) */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: "0 0 48%" }}>
                <InputField
                  label="姓（カタカナ） (必須)"
                  type="text"
                  name="lastNameKana"
                  value={formData.lastNameKana}
                  onChange={handleChange}
                  placeholder="セイを入力"
                  error={errors.lastNameKana}
                />
              </div>
              <div style={{ flex: "0 0 48%" }}>
                <InputField
                  label="名（カタカナ） (必須)"
                  type="text"
                  name="firstNameKana"
                  value={formData.firstNameKana}
                  onChange={handleChange}
                  placeholder="メイを入力"
                  error={errors.firstNameKana}
                />
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            {/* 전화번호 입력 */}
            <InputField
              label="電話番号 (必須)"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="電話番号を入力"
              error={errors.phone}
            />
          </>
        );
      case 2:
        return (
          <>
            {/* 약관 동의 안내 */}
            <div style={{ marginBottom: "1rem" }}>
              <p>利用規約およびプライバシーポリシーに同意します。</p>
              {/* 추후 체크박스와 링크 추가 가능 */}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "1rem",
        border: "1px solid #eee",
        borderRadius: "8px",
      }}
    >
      {/* 현재 스텝 제목 및 진행 상태 표시 */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2>{steps[currentStep]}</h2>
        <div>
          {steps.map((step, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                marginRight: "8px",
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor: index === currentStep ? "#0070f3" : "#ccc",
                color: index === currentStep ? "#fff" : "#000",
              }}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      {/* 각 스텝에 해당하는 폼 필드 렌더링 */}
      {renderStep()}

      {/* 폼 네비게이션 버튼 */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {currentStep > 0 && (
          <button type="button" onClick={handlePrev}>
            前に戻る
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button type="button" onClick={handleNext}>
            確認に進む
          </button>
        ) : (
          <button type="submit">送信する</button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
