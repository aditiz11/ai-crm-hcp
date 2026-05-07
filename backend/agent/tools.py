from db.database import get_connection

def log_interaction_tool(data):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""

    INSERT INTO interactions (

        hcp_name,
        date,
        sentiment,
        product,
        brochure_shared,
        summary,
        follow_up,
        raw_text

    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?)

    """, (

        data.get("hcp_name"),
        data.get("date"),
        data.get("sentiment"),
        data.get("product"),
        data.get("brochure_shared"),
        data.get("summary"),
        data.get("follow_up"),
        data.get("raw_text")

    ))

    conn.commit()

    conn.close()

    return {
        "message": "Interaction logged successfully"
    }

def edit_interaction_tool(current_data, updates):

    updated_data = {
        **current_data,
        **updates
    }

    return updated_data

def summarize_interaction_tool(data):

    return {
        "summary": data.get(
            "summary",
            "Interaction summarized"
        )
    }

def follow_up_tool(sentiment):

    if sentiment.lower() == "positive":

        return {
            "follow_up":
            "Follow up in 7 days"
        }

    return {
        "follow_up":
        "Follow up in 14 days"
    }

def compliance_check_tool(data):

    missing_fields = []

    required_fields = [
        "hcp_name",
        "sentiment",
        "product"
    ]

    for field in required_fields:

        if not data.get(field):

            missing_fields.append(field)

    return {
        "missing_fields": missing_fields
    }