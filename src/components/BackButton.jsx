import { useNavigate } from "react-router-dom";

function demo () {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate('/');
  }
};

export default demo