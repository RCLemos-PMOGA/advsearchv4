import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vmyxyxwgslgaujxgdgkh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZteXh5eHdnc2xnYXVqeGdkZ2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2MTI5MzIsImV4cCI6MTk5NjE4ODkzMn0.p1yR4JMbu6nKYnHMhYVUvDkI4zGE8KLtDHO_GxCPigo";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .in("category", selectedCategories);

    if (error) {
      console.error(error);
    } else {
      setSearchResults(data);
    }
  };

  const categories = ["Category A", "Category B", "Category C"];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <div className="mb-4">
        <span className="font-bold">Categories:</span>
        {categories.map((category) => (
          <label key={category} className="ml-4">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">{category}</span>
          </label>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="mt-4">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
