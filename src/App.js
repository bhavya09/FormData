import "./styles.css";
import { useState } from "react";

export default function App() {
  const defaultValues = {
    firstName: {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "First Name...",
      value: "",
      isError: false,
      errorMsg: "First Name can't be empty",
    },
    lastName: {
      id: "lastName",
      label: "Last Name",
      type: "name",
      placeholder: "Last Name...",
      value: "",
      isError: false,
      errorMsg: "Last Name can't be empty",
    },
    email: {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Email...",
      value: "",
      isError: false,
      errorMsg: "Email can't be empty",
    },
    password: {
      id: "password",
      label: "Password",
      type: "text",
      placeholder: "Password...",
      value: "",
      isError: false,
      errorMsg: "Password can't be empty",
    },
    confirmPassword: {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "text",
      placeholder: "Confirm Password...",
      value: "",
      isError: false,
      errorMsg: "Confirm Password can't be empty",
    },
  };

  const [formData, setFormData] = useState(defaultValues);
  const [isPassMatch, setIsPassMatch] = useState(true);

  const handleInput = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const copyFormData = { ...formData };
    copyFormData[key].value = value;
    setFormData(copyFormData);
    isValidForm();
  };

  const passwordMatch = () => {
    const copyFormData = { ...formData };
    const pass = copyFormData["password"].value;
    const cpass = copyFormData["confirmPassword"].value;
    if (pass !== cpass) {
      setIsPassMatch(false);
    } else {
      setIsPassMatch(true);
    }
  };

  const isValidForm = () => {
    const copyFormData = { ...formData };
    Object.keys(copyFormData).forEach((key) => {
      const obj = copyFormData[key];
      console.log("key", obj);
      obj.isError = !obj.value ? true : false;
      passwordMatch();
    });
    setFormData(copyFormData);
  };

  const handleFormSubmit = (e) => {
    isValidForm();
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={(e) => handleFormSubmit(e)}>
          {Object.keys(formData).map((key) => {
            const { id, label, type, placeholder, value, isError, errorMsg } =
              formData[key];
            return (
              <div className="form-item">
                <label>{label}</label>
                <input
                  onChange={handleInput}
                  id={id}
                  placeholder={placeholder}
                  type={type}
                  value={value}
                  className={isError && "error-border"}
                />
                {isError && <span className="error">{errorMsg}</span>}
                {key === "confirmPassword" && !isPassMatch && (
                  <span className="error">Password does not match</span>
                )}
              </div>
            );
          })}
          <div className="form-item">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
