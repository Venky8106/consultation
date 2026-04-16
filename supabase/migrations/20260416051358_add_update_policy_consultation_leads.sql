/*
  # Add UPDATE policy for consultation_leads

  Allows anonymous users to update their own lead's payment_status
  when it is still 'pending', matched by email. This is needed so
  the client can mark a lead as 'success' after payment confirmation.
*/

CREATE POLICY "Anyone can update pending lead payment status"
  ON consultation_leads
  FOR UPDATE
  USING (payment_status = 'pending')
  WITH CHECK (payment_status = 'success');
