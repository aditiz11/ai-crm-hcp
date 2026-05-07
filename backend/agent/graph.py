import os
import json
import requests
from datetime import datetime

from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def call_llm(prompt):

    response = requests.post(

        "https://api.groq.com/openai/v1/chat/completions",

        headers={

            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"

        },

        json={

            "model": "llama-3.3-70b-versatile",

            "messages": [

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            "temperature": 0.3

        }

    )

    result = response.json()

    content = result["choices"][0]["message"]["content"]

    # CLEAN JSON MARKDOWN
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return content


def process_interaction(user_input, current_data):

    prompt = f"""
You are an AI-powered CRM assistant for HCP interaction logging.

Your task is to intelligently UPDATE CRM interaction data.

IMPORTANT RULES:

1. Preserve existing CRM information unless the user explicitly changes it.

2. Only update fields mentioned in the latest user message.

3. Maintain previous interaction context.

4. Generate concise professional CRM summaries.

5. Generate smart follow-up recommendations.

6. Use DD/MM/YYYY date format.

7. If user mentions:
- today
- tomorrow
- yesterday

convert them into actual calendar dates.

8. If samples were distributed,
return meaningful sample names/details instead of yes/no.

9. If materials were shared,
extract them clearly.

10. Return ONLY valid JSON.
Do not include markdown.
Do not include explanations.

Current CRM Data:
{json.dumps(current_data, indent=2)}

Latest User Message:
{user_input}

Return JSON in this exact structure:

{{
    "hcp_name": "",
    "date": "",
    "time": "",
    "interaction_type": "",
    "attendees": "",
    "topics": "",
    "sentiment": "",
    "product": "",
    "summary": "",
    "follow_up": "",
    "brochure_shared": false,
    "materials_shared": "",
    "samples_distributed": "",
    "suggested_followups": []
}}

Summary Rules:
- Keep summary professional
- Preserve previous context
- Mention product discussion
- Mention sentiment
- Mention materials/samples shared
- Mention follow-up intent if applicable

Suggested Follow-up Rules:
- Return 2-3 actionable follow-up suggestions
- Keep them concise
- CRM/professional tone
"""

    llm_response = call_llm(prompt)

    print("RAW LLM RESPONSE:")
    print(llm_response)

    try:

        parsed = json.loads(llm_response)

        try:

            if parsed.get("date"):

                raw_date = parsed["date"]

                # HANDLE YYYY-MM-DD
                if "-" in raw_date:

                    dt = datetime.strptime(
                        raw_date,
                        "%Y-%m-%d"
                    )

                    parsed["date"] = dt.strftime(
                        "%d/%m/%Y"
                    )

        except:
            pass

        return parsed

    except Exception as e:

        print("JSON ERROR:")
        print(e)

        return {

            "hcp_name": "",
            "date": "",
            "time": "",
            "interaction_type": "",
            "attendees": "",
            "topics": "",
            "sentiment": "",
            "product": "",
            "summary": "",
            "follow_up": "",
            "brochure_shared": False,
            "materials_shared": "",
            "samples_distributed": "",
            "suggested_followups": []

        }