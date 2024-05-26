

try {
    const { data, error } = await supabase
        .from('test_table') // replace with your table name
        .insert([
            {
                Age: 21,
                Name: "Laksh-man"
            }
        ]);

    if (error) throw error;
    res.status(200).send('Data inserted successfully');
} catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data');
}