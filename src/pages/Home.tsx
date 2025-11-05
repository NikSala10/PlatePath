import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig"
import Logo from "../assets/Logo.svg";
import Galeria from "../assets/Image gallery.png";
import User from "../assets/Group 13054.png";

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
      <img src={Logo} alt="" style={{ width: "270px", display: "block"}} />
      <div className="intro">
        <div className="key-words">
          <h1 className="tit" style={{color: '#6455F6'}}>Inspiración</h1>
          <h1 className="tit" style={{color: ""}}>Sabor</h1>
          <h1 className="tit" style={{color:'#1CDC55'}}>Bienestar</h1>
          <p className="descrip">Planea tus comidas sin estrés y descubre menús adaptados a tu vida, todos los días.</p>
        </div>
        <div>
          <img src={Galeria} alt="" style={{ width: "550px" }}  />
        </div>
      </div>
      <img src={User} alt="" style={{width: "100%"}} />

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

    </div>
  );
};
