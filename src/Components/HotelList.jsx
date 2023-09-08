import { Stack, Typography,  CardActions,CardMedia,CardContent,Button,Card } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

const fechtHotels = async () => {
  const res = await fetch("http://localhost:3001/hotels");
    if(!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
};
function HotelList(){
    const {
        data: hotels,
        isLoading,
        error,
    } = useQuery({queryKey:["hotels"], queryFn: fechtHotels});
    if(isLoading){return <p>Loading...</p>;}
    
    if(error){return <div>Error fetching Hotels! {error.message}</div>;}

    return(
        <>
        <Typography variant="h4" component="h2" gutterBottom>
            Booking App
            </Typography>
            <Stack spacing={2}>
                {hotels.map((hotel) => (
                    <Link key={hotel.id} to={`/hotel/${hotel.id}`}>
                        <Card sx={{ maxWidth: 345 , backgroundColor:"#e8e8e8"}}>
                            <CardMedia sx={{height:140}}
                            image={hotel.img}
                            title={hotel.name} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hotel.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {hotel.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">See Datils</Button>
                            </CardActions>
                            </Card>
                            </Link>
                ))}
                </Stack>

        </>
    )
}
export default HotelList;
