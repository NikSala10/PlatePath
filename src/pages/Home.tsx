import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig"
import Logo from "../../public/assets/Logo.svg";
import Galeria from "../../public/assets/Image gallery.png";
import User from "../../public/assets/Group 13054.png";
import boy from"../../public/assets/Group 13058.png";
import  capsulas from"../../public/assets/Group 13057.png";
import andres from"../../public/assets/Group 13060.png"
import chica from "../../public/assets/Group 13082.png"
import pasoApaso from "../../public/assets/Group 13083.png"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { emojis } from "../data/likertIcons";
// import footer  from "../../public/assets/Group 13084.png"

export const Home = () => {

  const [scale1Selection, setScale1Selection] = useState(""); // Emoji seleccionado
  
  const handleScale1 = async (value: string) => {
    setScale1Selection(value);

    try {
      await addDoc(collection(db, "encuestas"), {
        pregunta: "¿Sueles terminar cocinando siempre lo mismo porque planificar te resulta difícil?",
        respuesta: value,
        fecha: new Date(),
      });
      console.log("Respuesta enviada:", value);
    } catch (error) {
      console.error("Error enviando la respuesta:", error);
    }
  };
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    p1: "",
    p2: "",
    p3: "",
    p4: ""
  });

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "encuestas"), {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        telefono: form.telefono,
        respuestas: {
          p1: form.p1,
          p2: form.p2,
          p3: form.p3,
          p4: form.p4
        },
        fecha: new Date()
      });

      alert("Encuesta enviada con éxito");
      setForm({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        p1: "",
        p2: "",
        p3: "",
        p4: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error al enviar");
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: "#6455F6",
    padding: "2rem",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: "25px",
    width: "700px",
    margin: "2rem auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    outline: "none",
    width: "70%",
    appearance: "none",
    gap: "1rem",
    color: "#fff",
  },
  row: {
    display: "flex",
    gap: "1rem",
  },
  inputGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    outline: "none",
    appearance: "none",
  },
  button: {
    marginTop: "1rem",
    background: "#2718BA",
    color: "white",
    border: "none",
    padding: "12px",
    width: "200px",
    height: "45px",
    borderRadius: "30px",
    fontSize: "16px",
    cursor: "pointer",
  },
  likertRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      marginTop: "0.5rem",
      margin: "0 auto",
      width: "500px"
    },
 
    labelRow: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "0.5rem",
      padding: "0 1rem",
      fontWeight: "bold",
    }
};

  return (
    <div className="home-container">
      <img src={Logo} alt="" style={{ width: "270px", display: "block", margin: "0 auto", paddingTop: "2rem", marginBottom: "0"}} />
      <div className="intro">
        <div className="key-words">
          <h1 className="tit" style={{color: '#6455F6'}}>Inspiración</h1>
          <h1 className="tit" style={{color: ""}}>Sabor</h1>
          <h1 className="tit" style={{color:'#1CDC55'}}>Bienestar</h1>
          <p className="descrip">Planea tus comidas sin estrés y descubre menús adaptados a tu vida, todos los días.</p>
        </div>
        <div>
          <img src={Galeria} alt="" style={{ width: "700px" }}  />
        </div>
      </div>
        <img src={User} alt="" style={{width: "100%", marginTop: "-11rem"}} />
        <div className="scale-1">
          <p className="questions">¿Te sientes identificado con la situación de Andrés?</p>
          <div style={styles.likertRow} className="div-icons">
            {Object.values(emojis).map((e, i) => (
              <button
                key={i}
                type="button"
                className="btn-likert"
                onClick={() => handleScale1(i.toString())} 
              >
                {e}
              </button>
            ))}
          </div>
          <div className="label-likert">
            <span>Nada</span>
            <span>Muy</span>
          </div>
        </div>
      <div>
        <div className="section-2">
          <h3 className="andres-work">Andrés, entre trabajo, universidad y familia,<br /> <b>nunca tiene tiempo</b> para decidir qué cocinar. </h3>
          <div><svg width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M77 38.5C77 57.1051 59.7616 72.1875 38.5 72.1875C34.6866 72.196 30.8888 71.7008 27.2051 70.7149C24.3946 72.1394 17.941 74.8729 7.084 76.6535C6.1215 76.8075 5.39 75.8065 5.77019 74.9114C7.47381 70.8881 9.01381 65.527 9.47581 60.6375C3.5805 54.7181 0 46.97 0 38.5C0 19.8949 17.2384 4.8125 38.5 4.8125C59.7616 4.8125 77 19.8949 77 38.5ZM34.6211 32.5614C34.3036 32.0882 33.9374 31.6495 33.5287 31.2524C32.8829 30.5931 32.1167 30.0638 31.2716 29.6931L31.2331 29.6739C30.0927 29.1469 28.8512 28.8743 27.5949 28.875C22.9845 28.875 19.25 32.4651 19.25 36.8974C19.25 41.3249 22.9845 44.9151 27.5949 44.9151C29.2456 44.9151 30.7808 44.4579 32.0753 43.6638C31.416 45.5359 30.1984 47.5331 28.1772 49.5351C27.9868 49.7209 27.8365 49.9437 27.7355 50.1899C27.6344 50.436 27.5849 50.7002 27.5899 50.9662C27.5948 51.2322 27.6542 51.4944 27.7643 51.7366C27.8744 51.9788 28.0329 52.1958 28.2301 52.3744C29.0627 53.1444 30.3813 53.1204 31.185 52.3263C37.6049 45.9305 37.7781 39.0534 35.7136 34.4912C35.4093 33.8173 35.0436 33.1729 34.6211 32.5662V32.5614ZM52.9375 43.6638C52.283 45.5359 51.0606 47.5331 49.0394 49.5351C48.8493 49.7212 48.6993 49.9443 48.5987 50.1906C48.4981 50.4369 48.449 50.7012 48.4544 50.9672C48.4598 51.2332 48.5196 51.4953 48.6302 51.7373C48.7407 51.9793 48.8996 52.1962 49.0971 52.3744C49.9249 53.1444 51.2435 53.1204 52.0472 52.3263C58.4671 45.9305 58.6403 39.0534 56.5806 34.4912C56.2748 33.8171 55.9075 33.1727 55.4833 32.5662C55.166 32.0913 54.7999 31.651 54.3909 31.2524C53.7451 30.5931 52.9789 30.0638 52.1338 29.6931L52.0953 29.6739C50.9563 29.1476 49.7166 28.875 48.4619 28.875C43.8563 28.875 40.117 32.4651 40.117 36.8974C40.117 41.3249 43.8563 44.9151 48.4619 44.9151C50.1126 44.9151 51.6478 44.4579 52.9423 43.6638H52.9375Z" fill="#6455F6"/>
          </svg></div>
          <h1 className="question-two">“¿Otra vez arroz con pollo y pasta?”</h1>
          <h3 className="think">Piensa mientras el estrés sube</h3>
        </div>
      </div>
      <div className="scale-2">
        <p className="questions">¿Sueles terminar cocinando siempre lo mismo <br /> porque planificar te resulta difícil?</p>
      </div>
      <img src={boy} style={ { width: "100%", marginTop: "-3rem" }} alt="" />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <img src={capsulas} style={{ width: "70%", marginTop: "-10rem" }} alt="" />
      </div>
      <div>
        <p className="questions">¿Qué tan estresante te resulta <br /> planificar tus comidas diarias?</p>
      </div>
      <img src={andres} style={ { width: "100%", marginTop: "-3rem", }}alt=""  />
      <div>
        <p className="questions">¿Te gustaría contar con ayuda para planificar <br /> tus comidas de manera fácil y sin presión?</p>
        <div style={{
          display: "flex",
          justifyContent: "flex-end"
        }}>
          
          <img src={chica} style={{ width: "90%", marginTop: "-3rem" }} alt="" />
        </div>

      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <img src={pasoApaso} style={ { width: "70%", }}alt="" />
      </div>

      <h1 className="call-to-action">SUSCRÍBETE</h1>
      <h2 className="rutin">¡y olvídate de la rutina en la cocina!</h2>
      <div style={styles.container}>
        <form style={styles.form} onSubmit={sendForm}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label>Nombre</label>
              <input className="input-rounded" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>

            <div style={styles.inputGroup}>
              <label>Apellido</label>
              <input className="input-rounded" name="apellido" value={form.apellido} onChange={handleChange} required />
            </div>
          </div>
          <div style={styles.inputGroup}>
          <label>Correo electrónico</label>
          <input
            name="correo"
            type="email"
            className="input-rounded"
            value={form.correo}
            onChange={handleChange}
            required
          />
          </div>
          <label className="phone">Número de celular</label>
          <PhoneInput
            country={"co"} 
            value={form.telefono}
            onChange={(value) => setForm({ ...form, telefono: value })}
            inputStyle={{ width: "100%", height: "55px", borderRadius: "15px"}}
            buttonStyle={{ borderRadius: "10px", border: "none", background: "#fff" }}
          />

          <button type="submit" style={styles.button}>
            Siguiente
          </button>
        </form>
    </div>
      {/* <div>
        <img src={footer} style={ { width: "100%", marginTop: "-3rem", }} alt="" />
      </div> */}
    </div>
  );
};
