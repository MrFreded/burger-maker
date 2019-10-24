const useValidation = (type, name, style, output) => {
  switch (type) {
    case 'valid':
      return {
        ...name,
        value: output,
        valid: true,
        className: style,
        showPopOver: false
      };
    case 'invalid':
      return {
        ...name,
        valus: output,
        valid: false,
        className: style,
        showPopOver: true
      };
    default:
      return null;
  }
};

export default useValidation;

// const validation = (name, event) => {
//     let style;
//     let output = event.target.value;

//     switch (name) {
//       case 'email':
//         if (validator.isEmail(output)) {
//           style = styles.valid;
//           let int = {
//             ...email,
//             value: output,
//             valid: true,
//             className: style,
//             showPopOver: false
//           };
//           setEmail(int);
//         } else {
//           style = styles.invalid;
//           let int = {
//             ...email,
//             value: output,
//             valid: false,
//             className: style,
//             showPopOver: true
//           };
//           setEmail(int);
//         }
//         break;
//       case 'password':
//         if (output.length >= 8) {
//           style = styles.valid;
//           let int = {
//             ...password,
//             value: output,
//             valid: true,
//             className: style,
//             showPopOver: false
//           };
//           setPassword(int);
//         } else {
//           style = styles.invalid;
//           let int = {
//             ...password,
//             value: output,
//             valid: false,
//             className: style,
//             showPopOver: true
//           };

//           setPassword(int);
//         }
//         break;

//       default:
//         return null;
//     }
//   };
