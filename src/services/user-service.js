export default class UserService {

    _apiBase = 'http://127.0.0.1:8080/api/v1';
  
    getResource = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    };

    postResource = async (url, data) => {
      const res = await fetch(`${this._apiBase}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type":"application/json; charset-UTF-8",
        }
      });
      return await res.json();
    };
  
    getAllPeople = async () => {
      const res = await this.getResource(`/users`);
      const newRes = Object.entries(res);
      return newRes.map(this._transformPerson)
    };
  
    getPerson = async (id) => {
      const person = await this.getResource(`/users/${id}`);
      return this._transformPersonById(person);
    };

    deletePerson = async (id) => {
      const res = await fetch(`${this._apiBase}/users/${id}`, {
        method: "DELETE"
      });
      return await res;
    };

    putPerson = async (data, id) => {
      const res = await fetch(`${this._apiBase}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type":"application/json; charset-UTF-8",
        }
      });
      return await res;
    };

    _transformPerson = (person) => {
      return {
        id: person[0],
        name: person[1].Name,
        age: person[1].Age,
        email: person[1].Email,
        address: person[1].Address
      }
    }

    _transformPersonById = (person) => {
      return {
        name: person.Name,
        age: person.Age,
        email: person.Email,
        address: person.Address
      }
    }
}; // UserService