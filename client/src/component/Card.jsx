import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Modal, Dialog } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import BedIcon from '@mui/icons-material/Bed';
import { MoreDetails } from '../component/MoreDetails';
import { useNavigate } from 'react-router-dom';
import { getCategories, getCities, removeApartment } from '../redux/api';
import { EditApartment } from './Update';

export const ApartmentCard = ({ apartment, isAdvertiser = false, onDeleted }) => {
  const [open, setOpen] = useState(false); // Modal for more details
  const [openEdit, setOpenEdit] = useState(false); // Dialog for edit form
  const [cities, setCities] = useState([]); // Loaded cities (optional usage)
  const [categories, setCategories] = useState([]); // Loaded categories (optional usage)
  const navigate = useNavigate();

  useEffect(() => {
    // Load cities and categories for display or future use
    const fetchData = async () => {
      try {
        const resCities = await getCities();
        const resCategories = await getCategories();
        setCities(resCities.data);
        setCategories(resCategories.data);
      } catch (error) {
        console.error("שגיאה בטעינת ערים/קטגוריות", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    // Confirmation and delete apartment API call
    if (window.confirm("האם את/ה בטוח שברצונך למחוק את הדירה?")) {
      try {
        await removeApartment(apartment._id);
        alert("הדירה נמחקה בהצלחה");
        if (onDeleted) onDeleted(apartment._id); // Inform parent component about deletion
      } catch (error) {
        console.error("שגיאה במחיקת הדירה:", error);
        alert("אירעה שגיאה בעת המחיקה");
      }
    }
  };

  return (
    <>
      <Card className='apartment-card'>
        <CardMedia 
          className='apartment-card-media'
          image={`images/${apartment.img}`} // Apartment image
          title={apartment.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5">{apartment.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{apartment.description}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Price */}
              <FontAwesomeIcon icon={faShekelSign} style={{ color: '#1976d2' }} />
              <Typography variant="body2">{apartment.price}</Typography>

              {/* City */}
              <LocationPinIcon color="primary" />
              <Typography variant="body2">{apartment.city?.nameC}</Typography>

              {/* Number of beds */}
              <BedIcon color="primary" />
              <Typography variant="body2">{apartment.numBeds}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            {/* Show more details modal */}
            <Button variant="contained" onClick={() => setOpen(true)}>לפרטים נוספים</Button>

            {/* Show edit/delete buttons only for advertiser */}
            {isAdvertiser && (
              <>
                <Button color="error" variant="outlined" onClick={handleDelete}>🗑️ מחיקה</Button>
                <Button variant="outlined" onClick={() => setOpenEdit(true)}>✏️ עריכה</Button>

                {/* Edit dialog */}
                <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
                  <EditApartment id={apartment._id} handleClose={() => setOpenEdit(false)} />
                </Dialog>
              </>
            )}
          </CardActions>
        </Box>
      </Card>

      {/* Modal for more details */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-box">
          <MoreDetails apartment={apartment} />
        </Box>
      </Modal>
    </>
  );
};
