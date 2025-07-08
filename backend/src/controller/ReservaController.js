import reservaModel from "../model/Reserva.js";
import clienteModel from "../model/Cliente.js"; 

const reservaController = {};
 
// GET
reservaController.getReservas = async (req, res) => {
  try {
    const reservas = await reservaModel.find().populate('clentid'); // usa el campo mal escrito
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas", error });
  }
};

// GET
reservaController.getReservaById = async (req, res) => {
  try {
    const reserva = await reservaModel.findById(req.params.id).populate('clentid');
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la reserva", error });
  }
};

// POST
reservaController.createReserva = async (req, res) => {
  try {
    const { clentid, vehicle, service, status } = req.body;

    // Validar existencia de cliente
    const clienteExiste = await clienteModel.findById(clentid);
    if (!clienteExiste) {
      return res.status(404).json({ message: "El cliente no existe" });
    }

    const nuevaReserva = new reservaModel({ clentid, vehicle, service, status });
    await nuevaReserva.save();
    res.status(201).json({ message: "Reserva creada con éxito", data: nuevaReserva });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva", error });
  }
};

// PUT 
reservaController.updateReserva = async (req, res) => {
  try {
    const { clentid, vehicle, service, status } = req.body;

    const reservaActualizada = await reservaModel.findByIdAndUpdate(
      req.params.id,
      { clentid, vehicle, service, status },
      { new: true }
    );

    if (!reservaActualizada) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json({ message: "Reserva actualizada", data: reservaActualizada });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva", error });
  }
};

// DELETE 
reservaController.deleteReserva = async (req, res) => {
  try {
    const reservaEliminada = await reservaModel.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva", error });
  }
};

export default reservaController;
