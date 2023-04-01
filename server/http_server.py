import pymongo
from flask import Flask, request, jsonify

app = Flask(__name__)

client = pymongo.MongoClient("mongodb+srv://noamv:12345@cluster0.5vok1pd.mongodb.net/?retryWrites=true&w=majority")
db = client["DMA"]
guides_collection = db["guides"]

guide = {
    "domain": "www.btl.gov.il",
    "guide_name": "106",
    "steps": [
        {"id": "c1", "action": "color"},
        {"id": "button", "action": "click"}
    ]
}


@app.route('/guide/<domain>/<guide_name>', methods=['GET'])
def get_guide(domain, guide_name):
    guide = guides_collection.find_one({"domain": domain, "guide_name": guide_name}, {"_id": False})
    if guide:
        return jsonify(guide)
    else:
        return jsonify({"message": "Guide not found"}), 404


# define a route to insert a new guide
@app.route('/guide', methods=['POST'])
def insert_guide():
    guide = request.get_json()
    print(guide)
    result = guides_collection.insert_one(guide)
    return jsonify({"message": "Guide inserted", "id": str(result.inserted_id)}), 201


if __name__ == '__main__':
    app.run(debug=True)
