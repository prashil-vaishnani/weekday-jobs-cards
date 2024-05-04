import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import "./TopFilter.css";
import { dispatch } from "../../redux/store";
import { setFilterValues } from "../../redux/slice/JobsSlice";

const TopFilter = () => {
  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    location: "",
    remoteOnsite: "",
    techStack: "",
    role: "",
    minBasePay: "",
  });

  const handleFilterChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    console.log(name, value);
    dispatch(setFilterValues({ ...filters, [name]: value }));
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="topFilter">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="minExperience">Min Experience</InputLabel>
            <Select
              labelId="minExperience"
              id="minExperience"
              name="minExperience"
              value={filters.minExperience}
              onChange={handleFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1 Year</MenuItem>
              <MenuItem value="2">2 Years</MenuItem>
              <MenuItem value="3">3 Years</MenuItem>
              <MenuItem value="4">4 Years</MenuItem>
              <MenuItem value="5">5 Years</MenuItem>
              <MenuItem value="6">6 Years</MenuItem>
              <MenuItem value="7">7 Years</MenuItem>
              <MenuItem value="8">8 Years</MenuItem>
              <MenuItem value="9">9 Years</MenuItem>

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={filters.companyName}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="remoteOnsite">Remote/On-site</InputLabel>
            <Select
              labelId="remoteOnsite"
              id="remoteOnsite"
              name="remoteOnsite"
              value={filters.remoteOnsite}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="onsite">On-site</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Min Base Pay(in LPA)"
            name="minBasePay"
            value={filters.minBasePay}
            onChange={handleFilterChange}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TopFilter;
