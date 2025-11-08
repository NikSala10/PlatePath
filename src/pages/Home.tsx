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
import footer  from "../../public/assets/Group 13084.png"

export const Home = () => {

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
        <h3>Te sientes identificado con la situación de Andrés?</h3>
      <div>
        <h3>Andrés, entre trabajo, universidad y familia, nunca tiene tiempo para decidir qué cocinar. </h3>
        <div><svg width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M77 38.5C77 57.1051 59.7616 72.1875 38.5 72.1875C34.6866 72.196 30.8888 71.7008 27.2051 70.7149C24.3946 72.1394 17.941 74.8729 7.084 76.6535C6.1215 76.8075 5.39 75.8065 5.77019 74.9114C7.47381 70.8881 9.01381 65.527 9.47581 60.6375C3.5805 54.7181 0 46.97 0 38.5C0 19.8949 17.2384 4.8125 38.5 4.8125C59.7616 4.8125 77 19.8949 77 38.5ZM34.6211 32.5614C34.3036 32.0882 33.9374 31.6495 33.5287 31.2524C32.8829 30.5931 32.1167 30.0638 31.2716 29.6931L31.2331 29.6739C30.0927 29.1469 28.8512 28.8743 27.5949 28.875C22.9845 28.875 19.25 32.4651 19.25 36.8974C19.25 41.3249 22.9845 44.9151 27.5949 44.9151C29.2456 44.9151 30.7808 44.4579 32.0753 43.6638C31.416 45.5359 30.1984 47.5331 28.1772 49.5351C27.9868 49.7209 27.8365 49.9437 27.7355 50.1899C27.6344 50.436 27.5849 50.7002 27.5899 50.9662C27.5948 51.2322 27.6542 51.4944 27.7643 51.7366C27.8744 51.9788 28.0329 52.1958 28.2301 52.3744C29.0627 53.1444 30.3813 53.1204 31.185 52.3263C37.6049 45.9305 37.7781 39.0534 35.7136 34.4912C35.4093 33.8173 35.0436 33.1729 34.6211 32.5662V32.5614ZM52.9375 43.6638C52.283 45.5359 51.0606 47.5331 49.0394 49.5351C48.8493 49.7212 48.6993 49.9443 48.5987 50.1906C48.4981 50.4369 48.449 50.7012 48.4544 50.9672C48.4598 51.2332 48.5196 51.4953 48.6302 51.7373C48.7407 51.9793 48.8996 52.1962 49.0971 52.3744C49.9249 53.1444 51.2435 53.1204 52.0472 52.3263C58.4671 45.9305 58.6403 39.0534 56.5806 34.4912C56.2748 33.8171 55.9075 33.1727 55.4833 32.5662C55.166 32.0913 54.7999 31.651 54.3909 31.2524C53.7451 30.5931 52.9789 30.0638 52.1338 29.6931L52.0953 29.6739C50.9563 29.1476 49.7166 28.875 48.4619 28.875C43.8563 28.875 40.117 32.4651 40.117 36.8974C40.117 41.3249 43.8563 44.9151 48.4619 44.9151C50.1126 44.9151 51.6478 44.4579 52.9423 43.6638H52.9375Z" fill="#6455F6"/>
        </svg></div>
        <h2>“¿Otra vez arroz con pollo y pasta?”</h2>
      </div>
      <img src={boy} style={ { width: "100%", marginTop: "-3rem" }} alt="" />

      <img src={capsulas} style={ { width: "80%", marginTop: "-3rem", }} alt="" />
      <div>
        <h3>¿Qué tan estresante te resulta planificar tus comidas diarias?</h3>
      </div>
      <img src={andres} style={ { width: "100%", marginTop: "-3rem", }}alt=""  />
      <div>
        <h3>¿Te gustaría contar con ayuda para planificar tus comidas de manera fácil y sin presión?</h3>
        <img src={chica} style={ { width: "100%", marginTop: "-3rem", }} alt="" />
      </div>
      <img src={pasoApaso} style={ { width: "70%", marginTop: "-3rem", }}alt="" />

      <h1>Encuesta Plate Path</h1>

      <form onSubmit={sendForm}>

        <input
          name="nombre" 
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          required
        />

        <input
          name="correo"
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          required
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
        />

        <label>1. ¿Qué tan útil te pareció la experiencia?</label>
        <select name="p1" onChange={handleChange} value={form.p1} required>
          <option value="">Selecciona</option>
          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <label>2. ¿Fue fácil interactuar con la plataforma?</label>
        <select name="p2" onChange={handleChange} value={form.p2} required>
          <option value="">Selecciona</option>
          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <label>3. ¿Te gustaría seguir usándola?</label>
        <select name="p3" onChange={handleChange} value={form.p3} required>
          <option value="">Selecciona</option>
          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <label>4. ¿Recomendarías esta experiencia a otra persona?</label>
        <select name="p4" onChange={handleChange} value={form.p4} required>
          <option value="">Selecciona</option>
          {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <button type="submit">Enviar</button>

      </form>
      <div>
        <img src={footer} style={ { width: "100%", marginTop: "-3rem", }} alt="" />
      </div>
    </div>
  );
};
