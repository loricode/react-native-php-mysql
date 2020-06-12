import React , {useState, useEffect} from 'react';
import { StyleSheet, Button, View, TextInput} from 'react-native';
import axios from 'axios';

export default function App(){

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [bandera, setBandera] = useState(false);
  const [id, setId] = useState('');
  const [lista, setLista] = useState([]);



const guardar = async () => {
    try {
      if(!bandera){
      const obj = {nombre, precio, cantidad}
      await axios.post('http://127.0.0.1/backend/producto.php',obj);
       
  }else{
       const obj = {id, nombre, precio, cantidad}
       console.log(obj)
       await axios.post('http://127.0.0.1/backend/actualizar.php',obj);
         
    }
  } catch (error) {
      console.log(error) 
    }

  setId('');
  setNombre('');
  setPrecio('');
  setCantidad('');
  setBandera(false);
  await listar();
}

//listar datos 
const listar = async () => {
   try {
     const res = await axios.get('http://localhost/backend/listar.php');
     setLista(res.data)
    
    } catch (error) {
     console.log(error)
   }
}

useEffect(() => {
    listar();
},[])


const eliminar = async (id) => {
  const obj = {id}
  try {
     await axios.post('http://localhost/backend/eliminar.php',obj); 
  } catch (error) {
    console.log(error)
  }
  await listar();
}

const actualizar = async (id) => {
  const obj = {id};

  try {
    const res = await axios.post('http://localhost/backend/obtener.php', obj);
    setId(res.data[0].id);
    setNombre(res.data[0].nombre);
    setPrecio(res.data[0].precio);
    setCantidad(res.data[0].cantidad);
  } catch (error) {
    console.log(error)
  }
  setBandera(true);
  await listar();
}


  return (
    <View style={styles.container}>
    
      <TextInput
        style={{ width:400, height: 50,fontSize:22,margin:10}}
        placeholder="Nombre"
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
      />
       <TextInput
        style={{width:400, height: 50 ,fontSize:22,margin:10}}
        placeholder="Precio"
        onChangeText={precio => setPrecio(precio)}
        value={precio}
      />
       <TextInput
        style={{width:400, height: 50 ,fontSize:22,margin:10}}
        placeholder="Cantidad"
        onChangeText={cantidad => setCantidad(cantidad)}
        value={cantidad}
      />

        <Button
          title="Guardar"
          onPress={() => guardar()}
        />

     <div style={{textAlign:'center'}}>
       <h1>Lista De Productos</h1>
     {lista.map(item => (
           <div key={item.id} >
             <h2>{item.nombre}</h2>
             <h3>{item.precio}</h3>
             <p>{item.cantidad}</p>
            
             <Button title="Eliminar" 
                     color='red'
                     onPress={() => eliminar(item.id)} />
                     <p></p>
             <Button title="Actualizar"
                     color="#0ACB4D"
                     onPress={() => actualizar(item.id)} /> 
           </div>
           ))}
     </div>
     
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignContent:'center',
    alignItems: 'stretch',
  },

});
