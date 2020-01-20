# How to fetch single row from database in php codeigniter?

If you require to get only one record from database table using codeigniter query then you can do it using row(). we can easily return one row from database in codeigniter.

I will give you simple example of fetch single record from database using mysql codeigniter.

Sometime we need to get only one record from database. might be you require to get last one row from database or fetch any single row using where or other condition. So just see bellow query how it make done.

**Example:**

$data = $this->db->get("items")->row();

print_r($data);

**Output:**

stdClass Object

(

    [id] => 2

    [title] => Codeigniter 3 CRUD Example 

    [description] => Codeigniter 3 CRUD Example From Scratch To follow : Itsolutionstuff.com

    [created_at] => 0000-00-00 00:00:00

    [updated_at] => 0000-00-00 00:00:00

)

You can get single fields value from object:

$data = $this->db->get("items")->row();

print_r($data->title);

I hope it can help you....