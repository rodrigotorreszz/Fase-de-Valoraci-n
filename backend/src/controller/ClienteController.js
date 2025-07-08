import bcrypt from 'bcryptjs';
import customersModel from "../model/Cliente.js";

const customersController = {};

// GET 
customersController.getCustomers = async (req, res) => {
  try {
    const customers = await customersModel.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los clientes", error });
  }
};

// GET /clients/:id – Get a client by ID
customersController.getCustomerById = async (req, res) => {
  try {
    const customer = await customersModel.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar cliente", error });
  }
};

// POST – Crear cliente con contraseña encriptada
customersController.createCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;

    const exists = await customersModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Ya existe un cliente con ese email" });
    }    
    //const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new customersModel({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
    });

    await newCustomer.save();
    res.status(201).json({ message: "Cliente registrado con éxito" });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Error al registrar cliente", error });
  }
};

customersController.updateCustomer = async (req, res) => {
  try {
    let { name, email, password, phone, age } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const updatedCustomer = await customersModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password, phone, age },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente actualizado", data: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente", error });
  }
};

// DELETE
customersController.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await customersModel.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error });
  }
};

export default customersController;
