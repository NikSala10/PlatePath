import { useEffect, useState } from "react";
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

export const Home = () => {

 // Estado para la primera encuesta (las caritas)
  const [scaleSelections, setScaleSelections] = useState<{ [key: string]: string }>({});
  // Estado para mostrar el segundo formulario
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [submitted, setSubmitted] = useState<{ [key: string]: boolean }>({});

  
useEffect(() => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, []);

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    nivelCocina: "",
    horasPreparación: ""
  });

  // Manejo de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Guardar la respuesta de cada carita
  const handleScale = async (question: string, value: string) => {
    // Evitar que el usuario cambie la respuesta
    if (scaleSelections[question]) return;

    // Actualizar estado local
    setScaleSelections(prev => ({ ...prev, [question]: value }));

    try {
      await addDoc(collection(db, "encuestas"), {
        pregunta: question,
        respuesta: value,
        fecha: new Date(),
      });
      console.log(`Respuesta de "${question}" enviada:`, value);
       setSubmitted(prev => ({ ...prev, [question]: true }));
    } catch (error) {
      console.error("Error enviando la respuesta:", error);
    }
  };

  // Enviar el primer formulario y mostrar el segundo
 const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Guardar respuestas del primer formulario en Firebase
  try {
    await addDoc(collection(db, "encuestas"), {
      ...form, // Información personal ya completada
      fecha: new Date(),
      respuestasPrevias: scaleSelections, // Respuestas de las caritas
      etapa: "primer_formulario"
    });
    console.log("Primer formulario guardado con éxito");
  } catch (error) {
    console.error("Error guardando el primer formulario:", error);
  }

  // Mostrar el segundo formulario
  setShowSecondForm(true);
};

  // Enviar el segundo formulario a Firebase
  const sendSecondForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "encuestas"), {
        ...form,
        fecha: new Date(),
        respuestasPrevias: scaleSelections,
        completada: true
      });
      alert("Encuesta completa enviada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al enviar");
    }
  };


  const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: "#6455F6",
    padding: "3rem",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: "25px",
    width: "600px",
    marginBottom: "12rem",
    margin: "2rem auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    outline: "none",
    width: "100%",
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
    height: "65px",
    borderRadius: "30px",
    fontSize: "20px",
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
      <div className="intro fade-in">
        <div className="key-words fade-in">
          <h1 className="tit" style={{color: '#6455F6'}}>Inspiración</h1>
          <h1 className="tit" style={{color: ""}}>Sabor</h1>
          <h1 className="tit" style={{color:'#1CDC55'}}>Bienestar</h1>
          <p className="descrip fade-in">Planea tus comidas sin estrés y descubre menús adaptados a tu vida, todos los días.</p>
        </div>
        <div>
          <img className="n fade-in" src={Galeria} alt="" style={{ width: "700px" }}  />
        </div>
      </div>
        <img className="n fade-in" src={User} alt="" style={{width: "100%", marginTop: "-11rem"}} />
        <div className="scale-1 fade-in">
          <p className="questions fade-in">¿Te sientes identificado con la situación de Andrés?</p>
          <div style={styles.likertRow} className="div-icons fade-in">
            {Object.values(emojis).map((e, i) => (
              <button
                key={i}
                disabled={!!scaleSelections["p1"]} // bloquea si ya respondió
                type="button"
                className="btn-likert"
                onClick={() => handleScale("p1", i.toString())}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="label-likert">
            <span>Nada</span>
            <span>Muy</span>
          </div>
          {submitted["p1"] && (
            <p style={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold", color: "#6455F6" }}>
              ¡Gracias por responder!
            </p>
          )}
        </div>
      <div>
        <div className="section-2 fade-in">
          <h3 className="andres-work fade-in">Andrés, entre trabajo, universidad y familia,<br /> <b>nunca tiene tiempo</b> para decidir qué cocinar. </h3>
          <div><svg width="77" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M77 38.5C77 57.1051 59.7616 72.1875 38.5 72.1875C34.6866 72.196 30.8888 71.7008 27.2051 70.7149C24.3946 72.1394 17.941 74.8729 7.084 76.6535C6.1215 76.8075 5.39 75.8065 5.77019 74.9114C7.47381 70.8881 9.01381 65.527 9.47581 60.6375C3.5805 54.7181 0 46.97 0 38.5C0 19.8949 17.2384 4.8125 38.5 4.8125C59.7616 4.8125 77 19.8949 77 38.5ZM34.6211 32.5614C34.3036 32.0882 33.9374 31.6495 33.5287 31.2524C32.8829 30.5931 32.1167 30.0638 31.2716 29.6931L31.2331 29.6739C30.0927 29.1469 28.8512 28.8743 27.5949 28.875C22.9845 28.875 19.25 32.4651 19.25 36.8974C19.25 41.3249 22.9845 44.9151 27.5949 44.9151C29.2456 44.9151 30.7808 44.4579 32.0753 43.6638C31.416 45.5359 30.1984 47.5331 28.1772 49.5351C27.9868 49.7209 27.8365 49.9437 27.7355 50.1899C27.6344 50.436 27.5849 50.7002 27.5899 50.9662C27.5948 51.2322 27.6542 51.4944 27.7643 51.7366C27.8744 51.9788 28.0329 52.1958 28.2301 52.3744C29.0627 53.1444 30.3813 53.1204 31.185 52.3263C37.6049 45.9305 37.7781 39.0534 35.7136 34.4912C35.4093 33.8173 35.0436 33.1729 34.6211 32.5662V32.5614ZM52.9375 43.6638C52.283 45.5359 51.0606 47.5331 49.0394 49.5351C48.8493 49.7212 48.6993 49.9443 48.5987 50.1906C48.4981 50.4369 48.449 50.7012 48.4544 50.9672C48.4598 51.2332 48.5196 51.4953 48.6302 51.7373C48.7407 51.9793 48.8996 52.1962 49.0971 52.3744C49.9249 53.1444 51.2435 53.1204 52.0472 52.3263C58.4671 45.9305 58.6403 39.0534 56.5806 34.4912C56.2748 33.8171 55.9075 33.1727 55.4833 32.5662C55.166 32.0913 54.7999 31.651 54.3909 31.2524C53.7451 30.5931 52.9789 30.0638 52.1338 29.6931L52.0953 29.6739C50.9563 29.1476 49.7166 28.875 48.4619 28.875C43.8563 28.875 40.117 32.4651 40.117 36.8974C40.117 41.3249 43.8563 44.9151 48.4619 44.9151C50.1126 44.9151 51.6478 44.4579 52.9423 43.6638H52.9375Z" fill="#6455F6"/>
          </svg></div>
          <h1 className="question-two fade-in">“¿Otra vez arroz con pollo y pasta?”</h1>
          <h3 className="think fade-in">Piensa mientras el estrés sube</h3>
        </div>
      </div>
      <div className="scale-2 fade-in">
        <p className="questions fade-in">¿Sueles terminar cocinando siempre lo mismo <br /> porque planificar te resulta difícil?</p>
        <div style={styles.likertRow} className="div-icons fade-in">
            {Object.values(emojis).map((e, i) => (
              <button
                key={i}
                disabled={!!scaleSelections["p2"]} // bloquea si ya respondió
                type="button"
                className="btn-likert"
                onClick={() => handleScale("p2", i.toString())}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="label-likert">
            <span>Siempre</span>
            <span>Nunca</span>
          </div>
          {submitted["p2"] && (
            <p style={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold", color: "#6455F6" }}>
              ¡Gracias por responder!
            </p>
          )}
      </div>
      <img src={boy} style={ { width: "100%", marginTop: "7rem" }} alt="" />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <img className="n fade-in" src={capsulas} style={{ width: "70%", marginTop: "-8rem", marginBottom: "5rem" }} alt="" />
      </div>
      <div>
      <div className="scale-3 fade-in">
        <p className="questions fade-in">¿Qué tan estresante te resulta <br /> planificar tus comidas diarias?</p>
        <div style={styles.likertRow} className="div-icons fade-in">
            {Object.values(emojis).map((e, i) => (
              <button
                key={i}
                disabled={!!scaleSelections["p3"]} // bloquea si ya respondió
                type="button"
                className="btn-likert"
                onClick={() => handleScale("p3", i.toString())}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="label-likert">
            <span>Muy</span>
            <span>Nada</span>
          </div>
          {submitted["p3"] && (
            <p style={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold", color: "#6455F6" }}>
              ¡Gracias por responder!
            </p>
          )}
      </div>
      </div>
      <img className="n fade-in" src={andres} style={ { width: "100%", marginTop: "9rem", marginBottom: "5rem" }}alt=""  />
      <div>
      <div className="scale-4 fade-in">
        <p className="questions fade-in">¿Te gustaría contar con ayuda para planificar <br /> tus comidas de manera fácil y sin presión?</p>
        <div style={styles.likertRow} className="div-icons fade-in">
            {Object.values(emojis).map((e, i) => (
              <button
                key={i}
                disabled={!!scaleSelections["p4"]}
                type="button"
                className="btn-likert"
                onClick={() => handleScale("p4", i.toString())}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="label-likert-diferente ">
            <span>No lo <br /> necesito</span>
            <span>Lo encesito <br /> urgente</span>
          </div>
          {submitted["p4"] && (
            <p style={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold", color: "#6455F6" }}>
              ¡Gracias por responder!
            </p>
          )}
      </div>
        <div style={{
          display: "flex",
          justifyContent: "flex-end"
        }}>
          
          <img className="n fade-in" src={chica} style={{ width: "90%", marginTop: "11rem", marginBottom: "10rem"}} alt="" />
        </div>

      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <img className="n fade-in" src={pasoApaso} style={ { width: "70%", marginBottom: "7rem"}} alt="" />
      </div>

      <h1 className="call-to-action fade-in">SUSCRÍBETE</h1>
      <h2 className="rutin fade-in">¡y olvídate de la rutina en la cocina!</h2>
       {!showSecondForm && (<div style={styles.container} className="n fade-in">
         
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
    </div>)}
    {showSecondForm && (<div style={styles.container} className="second-form fade-in">
        <form style={styles.form} onSubmit={sendSecondForm}>
        <h2 className="personalizer">¡Queremos que tu asesoría <br /> sea más personalizada!</h2>
            <div style={styles.inputGroup}>
              <label style={{marginBottom:"1rem", fontSize:"19px"}}>¿Cuántas horas le gustaría invertir en la preparación?</label>
              <input className="input-rounded" name="horasPreparación" type="number" value={form.horasPreparación} onChange={handleChange} required style={{width: "60%"}} />
            </div>
            <div style={styles.inputGroup}>
              <label style={{marginBottom:"1rem", fontSize:"19px", marginTop:"2rem"}}>¿Cómo consideras tu nivel de cocina?</label>
              <div style={{ display: "flex", gap: "4rem", marginBottom: "1rem" }}>
                {/* Opción 1 */}
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <input 
                    type="radio" 
                    name="nivelCocina" 
                    value="novato" 
                    checked={form.nivelCocina === "novato"} 
                    onChange={handleChange} 
                    style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }} 
                  />
                  Novato
                </label>

                {/* Opción 2 */}
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <input 
                    type="radio" 
                    name="nivelCocina" 
                    value="basico" 
                    checked={form.nivelCocina === "basico"} 
                    onChange={handleChange} 
                    style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }} 
                  />
                  Básico
                </label>

                {/* Opción 3 */}
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <input 
                    type="radio" 
                    name="nivelCocina" 
                    value="intermedio" 
                    checked={form.nivelCocina === "intermedio"} 
                    onChange={handleChange} 
                    style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }} 
                  />
                  Intermedio
                </label>

                {/* Opción 4 */}
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <input 
                    type="radio" 
                    name="nivelCocina" 
                    value="avanzado" 
                    checked={form.nivelCocina === "avanzado"} 
                    onChange={handleChange} 
                    style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }} 
                  />
                  Avanzado
                </label>
              </div>
            </div>
          <button type="submit" className="btn-susb">
            Suscribir
          </button>
        </form>
    </div>)}
      <div className="footer">
        <svg width="522" height="133" viewBox="0 0 522 133" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2.25674H57.2141C83.0007 2.25674 94.927 22.7286 94.927 43.6841C94.927 65.4456 82.1949 84.6279 57.2141 84.6279H37.0683V121.058H0V2.25674ZM37.0683 30.6272V56.2574H44.8043C53.0238 56.2574 58.0199 53.3559 58.0199 43.6841C58.0199 34.0123 53.0238 30.6272 44.8043 30.6272H37.0683Z" fill="#FFF9EB"/>
          <path d="M99.7154 0H136.3V121.058H99.7154V0Z" fill="#FFF9EB"/>
          <path d="M139.547 93.6549C139.547 75.4397 150.668 66.5739 167.913 66.5739L192.249 68.1859V64.6396C192.088 55.7738 192.732 45.9408 187.092 45.9408C179.194 45.9408 180.645 63.0276 180.645 63.0276H151.957C151.957 63.0276 152.441 26.4361 191.121 26.4361C225.288 26.4361 228.673 47.5528 228.673 64.6396V121.058H192.249V120.575C185.963 122.348 178.389 123.637 169.847 123.637C155.342 123.637 139.547 116.222 139.547 93.6549ZM176.616 93.6549C176.616 99.4579 179.033 103.488 185.48 103.488C187.414 103.488 189.67 103.165 192.249 102.682V86.401L184.835 85.5951C178.711 85.5951 176.616 87.207 176.616 93.6549Z" fill="#FFF9EB"/>
          <path d="M239.074 30.1436V17.248H275.498V30.1436H300.156V52.7111H275.498V92.8489C275.498 99.9415 277.109 101.715 283.234 101.715C292.098 101.715 300.156 95.2668 300.156 95.2668V116.706C300.156 116.706 291.453 123.154 276.787 123.154C245.682 123.154 239.074 112.192 239.074 92.8489V52.7111H228.598V30.1436H239.074Z" fill="#FFF9EB"/>
          <path d="M298.605 75.6009C298.605 41.2662 317.784 26.4361 345.988 26.4361C399.173 26.4361 386.763 85.5951 386.763 85.5951H335.834C336.479 97.5236 338.413 103.327 344.376 103.327C352.435 103.327 350.662 90.5921 350.662 90.4309H386.763C386.763 90.4309 391.114 124.766 345.988 124.766C317.784 124.766 298.605 109.936 298.605 75.6009ZM350.017 66.2515C350.017 66.2515 352.757 47.8752 344.376 47.8752C338.413 47.8752 336.318 54.0006 335.834 66.2515H350.017Z" fill="#FFF9EB"/>
          <path d="M392.609 130.706C392.789 130.571 393.081 130.346 393.486 130.031C393.846 129.717 394.295 129.132 394.835 128.277C395.33 127.423 395.892 126.186 396.521 124.567C397.151 122.947 397.803 120.743 398.478 117.955C398.837 116.47 399.309 114.581 399.894 112.287C400.479 109.993 401.108 107.542 401.783 104.933C402.502 102.325 403.222 99.6483 403.941 96.9046C404.661 94.116 405.358 91.4847 406.033 89.0109C406.707 86.4921 407.314 84.2206 407.854 82.1966C408.393 80.1726 408.821 78.5983 409.135 77.4739C408.281 78.0136 407.449 78.6208 406.64 79.2955C405.92 79.8802 405.156 80.5549 404.346 81.3195C403.537 82.0392 402.75 82.8038 401.985 83.6134C401.401 83.1187 400.951 82.5789 400.636 81.9942C400.456 81.7243 400.299 81.432 400.164 81.1171C399.894 80.4424 399.759 79.7453 399.759 79.0256C399.759 78.306 400.321 77.5638 401.446 76.7992C402.03 76.3944 402.907 75.8096 404.076 75.045C405.291 74.2804 406.775 73.5382 408.528 72.8186C410.282 72.0539 412.328 71.4017 414.667 70.862C417.005 70.3223 419.591 70.0524 422.424 70.0524C425.257 70.0524 427.528 70.6146 429.237 71.7391C430.991 72.8635 432.318 74.2354 433.217 75.8546C434.162 77.4739 434.769 79.183 435.038 80.9822C435.308 82.7813 435.376 84.3556 435.241 85.7049C434.971 88.2237 434.162 90.855 432.812 93.5987C431.463 96.3424 429.597 98.8837 427.214 101.223C424.83 103.516 421.93 105.473 418.512 107.092C415.094 108.712 411.182 109.634 406.775 109.858C406.415 111.568 406.055 113.322 405.695 115.121C405.336 116.92 404.953 118.697 404.548 120.451C404.144 122.16 403.717 123.757 403.267 125.241C402.862 126.77 402.435 128.075 401.985 129.154C401.535 130.324 400.951 131.246 400.231 131.921C399.512 132.64 398.365 133 396.791 133C395.982 133 395.24 132.798 394.565 132.393C393.846 131.988 393.194 131.426 392.609 130.706ZM408.596 99.9407C408.461 100.66 408.281 101.605 408.056 102.774C407.876 103.899 407.651 105.181 407.382 106.62C408.596 106.44 409.945 106.125 411.429 105.675C412.913 105.181 414.397 104.529 415.881 103.719C417.365 102.909 418.804 101.942 420.198 100.818C421.637 99.6483 422.941 98.3215 424.111 96.8372C425.28 95.3079 426.247 93.5987 427.011 91.7096C427.821 89.7755 428.338 87.639 428.563 85.3001C428.788 83.0512 428.653 81.1846 428.158 79.7003C427.708 78.171 427.034 76.9566 426.134 76.057C425.235 75.1125 424.201 74.4603 423.031 74.1005C421.862 73.6956 420.693 73.4932 419.524 73.4932C418.399 73.4932 417.298 73.6507 416.218 73.9655C415.139 74.2804 414.06 74.6852 412.98 75.1799C413.115 75.2249 413.273 75.3374 413.453 75.5173C413.722 75.7871 413.925 76.1695 414.06 76.6642C412.98 81.0272 412.081 84.6704 411.362 87.594C410.687 90.5177 410.147 92.9015 409.743 94.7457C409.248 96.9046 408.866 98.6363 408.596 99.9407Z" fill="#FFF9EB"/>
          <path d="M468.834 107.632C468.204 108.532 467.395 109.656 466.405 111.005C465.416 112.31 464.382 113.637 463.302 114.986C462.268 116.29 461.234 117.505 460.199 118.629C459.21 119.709 458.378 120.473 457.704 120.923C457.254 121.193 456.737 121.418 456.152 121.598C455.567 121.778 454.96 121.89 454.331 121.935C453.746 121.98 453.184 121.935 452.644 121.8C452.105 121.71 451.633 121.53 451.228 121.261C450.823 120.946 450.486 120.496 450.216 119.911C449.991 119.416 449.766 118.764 449.541 117.955C449.362 117.145 449.294 116.133 449.339 114.919C448.26 116.718 447.068 118.112 445.764 119.102C444.46 120.046 443.223 120.743 442.054 121.193C440.705 121.688 439.356 121.98 438.007 122.07C437.377 122.07 436.702 121.845 435.983 121.396C435.263 120.991 434.656 120.339 434.162 119.439C433.667 118.494 433.352 117.302 433.217 115.863C433.082 114.379 433.262 112.625 433.757 110.601C434.386 107.857 435.376 105.361 436.725 103.112C438.119 100.863 439.625 98.9512 441.244 97.3769C442.863 95.7577 444.46 94.5432 446.034 93.7336C447.608 92.924 448.912 92.5642 449.946 92.6542C451.16 92.8791 452.15 93.2389 452.914 93.7336C453.544 94.1834 453.948 94.8581 454.128 95.7577C454.353 96.6123 453.993 97.7592 453.049 99.1985C453.679 99.0636 454.196 98.9736 454.601 98.9287C455.05 98.8837 455.388 98.8612 455.612 98.8612C455.882 98.8612 456.062 98.8837 456.152 98.9287C456.197 99.0186 456.22 99.221 456.22 99.5359C456.22 99.8058 456.152 100.323 456.017 101.088C455.882 101.852 455.68 102.887 455.41 104.191C455.14 105.496 454.78 107.182 454.331 109.251C454.241 109.656 454.151 110.038 454.061 110.398C454.016 110.713 453.949 111.05 453.859 111.41C453.814 111.725 453.746 112.107 453.656 112.557C453.566 113.007 453.454 113.569 453.319 114.244C453.274 114.649 453.251 115.099 453.251 115.593C453.296 116.043 453.386 116.47 453.521 116.875C453.656 117.28 453.859 117.617 454.128 117.887C454.443 118.112 454.87 118.225 455.41 118.225C455.86 118.225 456.444 117.955 457.164 117.415C457.883 116.83 458.648 116.111 459.457 115.256C460.267 114.356 461.099 113.389 461.953 112.355C462.853 111.275 463.685 110.241 464.449 109.251C465.214 108.262 465.888 107.385 466.473 106.62C467.102 105.855 467.552 105.293 467.822 104.933C468.182 104.529 468.541 104.304 468.901 104.259C469.261 104.169 469.531 104.259 469.711 104.529C469.891 104.798 469.913 105.203 469.778 105.743C469.688 106.283 469.373 106.912 468.834 107.632ZM449.069 110.601C449.294 109.701 449.564 108.644 449.879 107.43C450.193 106.215 450.463 105.046 450.688 103.921C450.913 102.797 451.07 101.875 451.16 101.155C451.295 100.39 451.273 100.031 451.093 100.076C450.868 100.121 450.621 100.188 450.351 100.278C450.126 100.368 449.834 100.435 449.474 100.48C449.114 100.525 448.754 100.593 448.395 100.683C448.754 99.9632 448.957 99.3785 449.002 98.9287C449.092 98.4339 449.114 98.0516 449.069 97.7817C449.024 97.4669 448.934 97.2195 448.799 97.0396C448.305 96.6348 447.428 96.9721 446.169 98.0516C444.954 99.0861 443.538 101.02 441.919 103.854C441.244 105.023 440.705 106.283 440.3 107.632C439.895 108.936 439.603 110.173 439.423 111.343C439.288 112.512 439.266 113.547 439.356 114.446C439.446 115.301 439.625 115.863 439.895 116.133C440.39 116.628 440.952 116.875 441.582 116.875C442.211 116.83 442.841 116.65 443.47 116.335C444.145 115.976 444.797 115.526 445.427 114.986C446.101 114.446 446.686 113.884 447.18 113.299C447.72 112.715 448.147 112.175 448.462 111.68C448.822 111.185 449.024 110.826 449.069 110.601Z" fill="#FFF9EB"/>
          <path d="M489.205 103.989C489.385 103.719 489.61 103.561 489.88 103.517C490.195 103.427 490.442 103.449 490.622 103.584C490.802 103.719 490.892 103.944 490.892 104.259C490.937 104.573 490.824 105.001 490.554 105.541C489.655 107.25 488.463 109.094 486.979 111.073C485.54 113.052 484.011 114.919 482.392 116.673C480.773 118.382 479.199 119.799 477.67 120.923C476.141 122.048 474.86 122.61 473.825 122.61C472.341 122.61 471.105 122.318 470.115 121.733C469.126 121.148 468.339 120.428 467.754 119.574C467.215 118.719 466.833 117.797 466.608 116.808C466.383 115.773 466.315 114.829 466.405 113.974C466.45 113.254 466.608 111.972 466.878 110.128C467.147 108.239 467.507 106.08 467.957 103.651C468.407 101.178 468.901 98.5463 469.441 95.7577C470.025 92.924 470.633 90.2028 471.262 87.594C470.498 87.684 469.733 87.774 468.969 87.8639C468.204 87.9539 467.507 87.9989 466.878 87.9989C465.439 87.9989 464.089 87.8414 462.83 87.5266C461.526 87.1668 460.559 86.8294 459.93 86.5146C459.57 86.3346 459.412 86.0873 459.457 85.7724C459.502 85.4126 459.637 85.0752 459.862 84.7604C460.087 84.4006 460.379 84.1082 460.739 83.8833C461.054 83.6134 461.346 83.4785 461.616 83.4785C462.47 83.5685 463.392 83.6584 464.382 83.7484C465.371 83.7934 466.45 83.7934 467.62 83.7484C468.474 83.7034 469.283 83.6359 470.048 83.546C470.857 83.456 471.644 83.3436 472.409 83.2086C472.993 81.0497 473.556 79.183 474.095 77.6088C474.68 75.9896 475.197 74.8651 475.647 74.2354C475.782 74.0105 476.074 73.8306 476.524 73.6956C477.018 73.5157 477.536 73.4033 478.075 73.3583C478.615 73.2683 479.132 73.2683 479.627 73.3583C480.121 73.4033 480.481 73.5607 480.706 73.8306C480.931 74.1904 481.021 75.1125 480.976 76.5968C480.931 78.0811 480.683 79.9702 480.234 82.2641C482.122 82.2641 483.786 82.3765 485.225 82.6014C486.709 82.7813 487.969 83.0062 489.003 83.2761C490.037 83.501 490.869 83.7484 491.499 84.0182C492.128 84.2431 492.601 84.4006 492.915 84.4905C493.23 84.5805 493.388 84.8054 493.388 85.1652C493.433 85.525 493.365 85.9074 493.185 86.3122C493.05 86.672 492.803 86.9868 492.443 87.2567C492.083 87.5266 491.679 87.6165 491.229 87.5266C490.779 87.4816 490.262 87.3916 489.678 87.2567C489.138 87.1218 488.463 87.0093 487.654 86.9194C486.889 86.8294 485.967 86.7395 484.888 86.6495C483.809 86.5595 482.55 86.5146 481.111 86.5146C480.841 86.5146 480.526 86.537 480.166 86.582C479.851 86.582 479.514 86.582 479.154 86.582C478.975 87.3017 478.795 88.0214 478.615 88.741C478.48 89.4157 478.278 90.1353 478.008 90.9C477.423 92.6991 476.749 94.6557 475.984 96.7697C475.31 98.6138 474.5 100.728 473.556 103.112C472.611 105.496 471.554 108.037 470.385 110.736C470.115 112.67 470.138 114.154 470.453 115.188C470.812 116.178 471.24 116.898 471.734 117.347C472.319 117.842 473.038 118.112 473.893 118.157C474.567 118.247 475.377 118.022 476.321 117.482C477.311 116.898 478.323 116.133 479.357 115.188C480.391 114.244 481.425 113.209 482.46 112.085C483.539 110.96 484.528 109.858 485.428 108.779C486.327 107.7 487.114 106.732 487.789 105.878C488.463 104.978 488.936 104.349 489.205 103.989Z" fill="#FFF9EB"/>
          <path d="M519.965 106.215C520.28 105.855 520.595 105.675 520.909 105.675C521.269 105.63 521.539 105.72 521.719 105.945C521.944 106.125 522.034 106.418 521.989 106.822C521.989 107.227 521.809 107.677 521.449 108.172C520.595 109.341 519.605 110.556 518.481 111.815C517.357 113.029 516.143 114.221 514.839 115.391C513.579 116.56 512.298 117.662 510.993 118.697C509.689 119.731 508.43 120.586 507.216 121.261C505.867 122.025 504.72 122.408 503.776 122.408C502.876 122.408 501.977 121.823 501.078 120.653C500.268 119.619 499.863 118.517 499.863 117.347C499.908 116.133 500.178 114.626 500.673 112.827C500.988 111.703 501.415 110.376 501.954 108.846C502.539 107.272 502.989 105.765 503.304 104.326C503.663 102.887 503.776 101.672 503.641 100.683C503.506 99.6483 502.921 99.1311 501.887 99.1311C501.167 99.1311 500.38 99.3785 499.526 99.8732C498.717 100.368 497.885 101.02 497.03 101.83C496.221 102.594 495.434 103.472 494.669 104.461C493.905 105.451 493.23 106.418 492.646 107.362C492.286 109.116 491.926 110.848 491.566 112.557C491.252 113.997 490.914 115.571 490.554 117.28C490.24 118.944 489.925 120.428 489.61 121.733C489.34 121.958 489.048 122.115 488.733 122.205C488.418 122.295 488.126 122.34 487.856 122.34C487.541 122.34 487.227 122.318 486.912 122.273C486.552 122.183 486.215 122.048 485.9 121.868C485.63 121.688 485.36 121.44 485.091 121.126C484.821 120.856 484.618 120.473 484.483 119.979C486.507 111.658 488.104 104.978 489.273 99.9407C490.442 94.9031 491.341 91.0574 491.971 88.4037C492.691 85.2552 493.185 83.0737 493.455 81.8593C493.59 81.0047 493.702 80.1726 493.792 79.363C493.882 78.6433 493.927 77.9011 493.927 77.1365C493.927 76.3719 493.86 75.6747 493.725 75.045C494.085 74.8201 494.467 74.6402 494.872 74.5053C495.321 74.3703 495.749 74.2579 496.153 74.1679C496.648 74.033 497.143 73.9205 497.637 73.8306C498.132 73.7406 498.582 73.6956 498.986 73.6956C499.346 73.6956 499.683 73.7406 499.998 73.8306C500.313 73.8756 500.515 74.0105 500.605 74.2354C500.875 74.4603 500.988 74.9101 500.943 75.5848C500.943 76.2594 500.898 76.9566 500.808 77.6763C500.628 78.5309 500.425 79.4529 500.201 80.4424C499.256 84.0857 498.199 87.639 497.03 91.1024C495.861 94.5208 494.782 98.1865 493.792 102.1C494.377 101.2 495.074 100.278 495.883 99.3335C496.693 98.3889 497.57 97.5343 498.514 96.7697C499.504 95.9601 500.538 95.3079 501.617 94.8131C502.696 94.2734 503.843 94.0035 505.057 94.0035C505.687 94.0035 506.272 94.116 506.811 94.3408C507.396 94.5208 507.891 94.8581 508.295 95.3529C508.745 95.8027 509.082 96.4324 509.307 97.242C509.532 98.0066 509.622 98.9736 509.577 100.143C509.577 100.863 509.487 101.605 509.307 102.37C509.172 103.134 508.97 103.989 508.7 104.933C508.43 105.833 508.07 106.845 507.621 107.969C507.216 109.094 506.721 110.398 506.137 111.883C505.732 112.917 505.417 113.794 505.192 114.514C504.967 115.233 505.012 115.863 505.327 116.403C505.732 117.123 506.519 117.302 507.688 116.943C508.902 116.538 510.701 115.368 513.085 113.434C513.624 112.984 514.231 112.422 514.906 111.748C515.581 111.073 516.233 110.398 516.862 109.724C517.492 109.004 518.076 108.329 518.616 107.7C519.156 107.07 519.605 106.575 519.965 106.215Z" fill="#FFF9EB"/>
        </svg>
      </div>
    </div>
  );
};
